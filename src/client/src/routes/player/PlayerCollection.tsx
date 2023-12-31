import { ChangeEvent, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Table } from 'components/Table';
import { GetPlayerCollectionRes } from 'server';
import { GameInfo } from 'server/src/clientInfoClean';
import { hridToDisplayName } from 'util/hridToDisplayName';
import { Checkbox } from 'components/Checkbox';
import { useSearchParams } from 'react-router-dom';

export interface PlayerCollectionLoaderData extends GetPlayerCollectionRes {
  itemDetailMap: GameInfo['itemDetailMap'];
}

type CheckedMap = Record<string, boolean>;

export function PlayerCollection() {
  const { distinctItems, itemDetailMap, itemCategoryDetailMap } =
    useLoaderData() as PlayerCollectionLoaderData;
  const [searchParams] = useSearchParams();

  const playerItemMap = Object.fromEntries(
    distinctItems.map((item) => [item.itemHrid, item])
  );

  const [checkedMap, setCheckedMap] = useState<CheckedMap>({
    collected: true,
    missing: true,
    ...Object.fromEntries(
      Object.keys(itemCategoryDetailMap).map((key) => [key, true])
    ),
  });

  useEffect(() => {
    if (searchParams.size === 0) return;
    const defaultCheckedMap: CheckedMap = {};
    for (const key of searchParams.keys()) {
      defaultCheckedMap[key] = true;
    }
    setCheckedMap(defaultCheckedMap);
  }, [searchParams]);
  const checkboxHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    const id = e.target.id;

    if (checkedMap == null) return;
    setCheckedMap({ ...checkedMap, [id]: value });
  };

  // if collected is checked, include playerHasItem = true
  // if missing is checked, include playerHasItem = false
  const filter: Record<string, (boolean | string)[]> = {
    playerHasItem: [checkedMap['collected'], !checkedMap['missing']],
    categoryHrid: Object.keys(checkedMap).filter(
      (key) => key.includes('/item_categories/') && checkedMap[key]
    ),
  };

  return (
    <div className='p-2 m-4 secondary rounded mx-auto md:w-6/12'>
      <div className='mx-auto md:w-6/12'>
        <details className='collapse collapse-arrow bg-base-200 mb-4'>
          <summary className='collapse-title text-lg font-bold'>
            Filters
          </summary>
          <div className='collapse-content flex'>
            <div className='px-4'>
              <p className='font-bold'>Status</p>
              <Checkbox
                id='collected'
                defaultChecked={true}
                label='Collected'
                handleChange={checkboxHandleChange}
              />
              <Checkbox
                id='missing'
                defaultChecked={true}
                label='Missing'
                handleChange={checkboxHandleChange}
              />
            </div>
            <div className='flex-1 px-4'>
              <p className='font-bold'>Categories</p>
              {Object.values(itemCategoryDetailMap).map((category) => {
                return (
                  <Checkbox
                    key={category.hrid}
                    defaultChecked={true}
                    id={category.hrid}
                    label={category.name}
                    handleChange={checkboxHandleChange}
                  />
                );
              })}
            </div>
          </div>
        </details>
      </div>

      <Table
        data={Object.values(itemDetailMap)
          .map((itemDetail) => {
            const playerHasItem = playerItemMap[itemDetail.hrid] != null;
            return {
              ...itemDetail,
              playerHasItem,
            };
          })
          .filter((val) => {
            for (const key in filter) {
              // TODO: Ugly type casting...
              if (
                !filter[key].includes(
                  val[key as keyof typeof val] as string | boolean
                )
              ) {
                return false;
              }
            }

            return true;
          })}
        headers={[
          { label: 'Category', key: 'categoryHrid' },
          { label: 'Item', key: 'name' },
          { label: 'Collected', key: 'playerHasItem' },
        ]}
        defaultColumn='categoryHrid'
        row={(item, i) => {
          return (
            <tr key={i}>
              <td className='p-2'>{hridToDisplayName(item.categoryHrid)}</td>
              <td className='p-2'>{item.name}</td>
              <td className='p-2'>{item.playerHasItem ? '✅' : '❌'}</td>
            </tr>
          );
        }}
      />
    </div>
  );
}

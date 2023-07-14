import { ChangeEvent, useState } from 'react';
import { useLoaderData } from 'react-router';
import Select, { OnChangeValue } from 'react-select';
import { Table } from 'components/Table';
import { GetPlayerCollectionRes } from 'server';
import { GameInfo } from 'server/src/clientInfoClean';
import { hridToDisplayName } from 'util/hridToDisplayName';
import { customTheme } from 'util/reactSelectCustomTheme';

export interface PlayerCollectionLoaderData extends GetPlayerCollectionRes {
  itemDetailMap: GameInfo['itemDetailMap'];
}

type CheckedMap = Record<string, boolean>;

type CollectionStatus = 'all' | 'collected' | 'missing';

interface CollectionStatusOption {
  label: string;
  value: CollectionStatus;
}

const collectionStatusOptions: CollectionStatusOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Collected', value: 'collected' },
  { label: 'Missing', value: 'missing' },
];
const defaultCollectionStatusOption = collectionStatusOptions[0];

export function PlayerCollection() {
  const { distinctItems, itemDetailMap } =
    useLoaderData() as PlayerCollectionLoaderData;
  // Toggles:
  // Show missing | Show collected
  // Show [categories]
  const playerItemMap = Object.fromEntries(
    distinctItems.map((item) => [item.itemHrid, item])
  );

  // const [checkedMap, setCheckedMap] = useState<CheckedMap>({});
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.checked;
  //   const id = e.target.id;

  //   if (checkedMap == null) return;
  //   setCheckedMap({ ...checkedMap, [id]: value });
  // };

  const [collectionStatus, setCollectionStatus] =
    useState<CollectionStatusOption>(defaultCollectionStatusOption);

  const selectHandleChange = (
    newValue: OnChangeValue<CollectionStatusOption, false>
  ) => {
    if (newValue == null) return;

    setCollectionStatus(newValue);
  };

  return (
    <div className='p-2 m-4 secondary rounded mx-auto md:w-6/12'>
      <Select
        options={collectionStatusOptions}
        defaultValue={defaultCollectionStatusOption}
        placeholder='Choose collection status...'
        onChange={selectHandleChange}
        theme={customTheme}
      />
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
            if (collectionStatus.value === 'all') return val;
            else if (collectionStatus.value === 'collected')
              return val.playerHasItem;
            else return !val.playerHasItem;
          })}
        headers={[
          { label: 'Category', key: 'categoryHrid' },
          { label: 'Item', key: 'name' },
          { label: 'Has Item', key: 'playerHasItem' },
        ]}
        defaultColumn='categoryHrid'
        row={(item, i) => {
          return (
            <tr key={i}>
              <td className='p-2'>{hridToDisplayName(item.categoryHrid)}</td>
              <td className='p-2'>{item.name}</td>
              <td className='p-2'>{item.playerHasItem ? 'yes' : 'no'}</td>
            </tr>
          );
        }}
      />
    </div>
  );
}

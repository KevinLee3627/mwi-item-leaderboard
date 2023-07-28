import { CSSProperties } from 'react';

interface ChangelogProps {
  dialogId?: string;
  buttonTextAlign?: CSSProperties['textAlign'];
}

export function Changelog({
  dialogId = 'changelogModal',
  buttonTextAlign = 'center',
}: ChangelogProps) {
  return (
    <div className='grid place-items-center'>
      <button
        className={`text-white w-full h-full text-${buttonTextAlign}`}
        onClick={() => {
          const modal = document.getElementById(dialogId) as HTMLDialogElement;
          modal.showModal();
        }}
      >
        Changelog
      </button>
      <dialog id={dialogId} className='modal'>
        <form method='dialog' className='modal-box'>
          <h1 className='font-bold text-3xl pb-4'>CHANGELOG</h1>
          <ChangelogEntry
            title='v0.14 - Minor Change'
            date='2023-07-27'
            items={[
              'Item leaderboards only show enhancement level column if the item can be enhanced (aka equipment)',
            ]}
          />
          <ChangelogEntry
            title='v0.13 - Collection Filters'
            date='2023-07-14'
            items={[
              'Backend changes w/ regards to hosting - urls are now cleaner as a result (no ugly hash routing!)',
              "Added filtering capabilities to a player's collection page!",
              'Added links on player collection stats to the collection pag for that particular category (link comes pre-filtered!)',
              'Added Estimated Net Worth to player stats',
            ]}
          />
          <ChangelogEntry
            title='v0.12 - Player Item Collection Stats'
            date='2023-07-11'
            items={[
              "Added item collection stats to player page - see how many items you have and how many you're missing",
            ]}
          />
          <ChangelogEntry
            title='v0.11 - Mobile CSS Changes'
            date='2023-07-10'
            items={['Made mobile not look like garbage']}
          />
          <ChangelogEntry
            title='v0.10 - Player Profile Ranks'
            date='2023-07-09'
            items={[
              'Leaderboards now use an actual rank function, allowing for ties',
              'Player pages now include a rank column, allowing you to see where a player ranks for each item/ability',
              'Added special leaderboard - Total Top Ranks. This shows the total number of #1 spots a player has.',
            ]}
          />
          <ChangelogEntry
            title='v0.9 - Special Leaderboards'
            date='2023-07-02'
            items={['Added two special leaderboards', 'A bit of code cleanup']}
          />
          <ChangelogEntry
            title='v0.8 - Ability Tracking'
            date='2023-06-30'
            items={['Added ability levels to leaderboards and player pages']}
          />
          <ChangelogEntry
            title='v0.7 - Player Search'
            date='2023-06-30'
            items={['Added player search page']}
          />
          <ChangelogEntry
            title='v0.6'
            date='2023-06-30'
            items={[
              "Enhancement level picker will only show levels that exist - no more clicking through 20 levels to see what's up",
            ]}
          />
          <ChangelogEntry
            title='v0.5'
            date='2023-06-29'
            items={[
              'Basic linking between players and items in UI',
              'Changed leaderboard to show top 10 of each enhancement level when level was set to "all"',
              'Custom domain name!',
              'Added "rank" column to leaderboards',
              'Updated styling - using "night" theme from daisyui',
              'Made player pages look much better',
              'Added sorting to tables',
              'Added medals to top 3 players on item leaderboards',
            ]}
          />
          <ChangelogEntry
            title='v0.4'
            date='2023-06-28'
            items={[
              'Allow users to choose "all" in enhancement picker to see top 3 of each enhancement level',
            ]}
          />
          <ChangelogEntry
            title='v0.3'
            date='2023-06-27'
            items={[
              'Fixed bug where certain equipment did not appear in search box',
              'Basic UI changes',
              'Added basic player pages',
            ]}
          />
          <ChangelogEntry
            title='v0.2'
            date='2023-06-26'
            items={[
              'Items are now sorted alphabetically',
              'Items with different enhancement levels are now shown separately',
              'Added separate picker for choosing enhancement levels',
              'Format number to locale',
              'Format dates to locale',
              'Removed Cowbells from leaderboard',
            ]}
          />
          <ChangelogEntry
            title='v0.1'
            date='2023-06-25'
            items={['Initial release']}
          />
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

interface ChangelogEntryProps {
  title: string;
  date: string;
  items: string[];
}
function ChangelogEntry({ title, date, items }: ChangelogEntryProps) {
  return (
    <div className='my-2'>
      <h2 className='font-bold text-lg'>{title}</h2>
      <time dateTime={date} className='text-md'>
        {date}
      </time>
      <ul className='list-disc list-outside ms-4 w-full whitespace-normal'>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function Changelog() {
  return (
    <div className='mx-auto grid place-items-center'>
      <button
        className='btn'
        onClick={() => {
          const modal = document.getElementById(
            'changelogModal'
          ) as HTMLDialogElement;
          modal.showModal();
        }}
      >
        Changelog
      </button>
      <dialog id='changelogModal' className='modal'>
        <form method='dialog' className='modal-box'>
          <h1 className='font-bold text-lg'>v0.1 - 2023-06-25</h1>
          <ul className='list-disc'>
            <li>Initial release</li>
          </ul>
          <h1 className='font-bold text-lg'>v0.2 - 2023-06-26</h1>
          <ul className='list-disc'>
            <li>Items are now sorted alphabetically</li>
            <li>
              Items with different enhancement levels are now shown separately
            </li>
            <li>Added separate picker for choosing enhancement levels</li>
            <li>Format number to locale</li>
            <li>Format dates to locale</li>
            <li>Removed Cowbells from leaderboard</li>
          </ul>
          <h1 className='font-bold text-lg'>v0.3 - 2023-06-27</h1>
          <ul className='list-disc'>
            <li>
              Fixed bug where certain equipment did not appear in search box
            </li>
            <li>Basic UI changes</li>
            <li>Added basic player pages</li>
          </ul>
          <h1 className='font-bold text-lg'>v0.4 - 2023-06-28</h1>
          <ul className='list-disc'>
            <li>
              Allow users to choose 'all' in enhancement level picker to see top
              3 of each enhancement level
            </li>
          </ul>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

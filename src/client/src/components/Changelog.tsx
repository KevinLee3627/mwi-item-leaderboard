export function Changelog() {
  return (
    <div className='mx-auto grid place-items-center'>
      <button className='btn' onClick={() => window.changelogModal.showModal()}>
        Changelog
      </button>
      <dialog id='changelogModal' className='modal'>
        <form method='dialog' className='modal-box'>
          <h1 className='font-bold text-lg'>v0.1 - 2023-06-25</h1>
          <ul>
            <li>Initial release</li>
          </ul>
          <h1 className='font-bold text-lg'>v0.2 - 2023-06-26</h1>
          <ul>
            <li>Items are now sorted alphabetically</li>
            <li>
              Items with different enhancement levels are now shown separately
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
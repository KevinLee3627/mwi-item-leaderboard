export function IssueModal() {
  return (
    <div className='mx-auto grid place-items-center'>
      <button
        className='text-white h-full px-4'
        onClick={() => {
          const modal = document.getElementById(
            'issueModal'
          ) as HTMLDialogElement;
          modal.showModal();
        }}
      >
        Issues?
      </button>
      <dialog id='issueModal' className='modal'>
        <form method='dialog' className='modal-box'>
          <p>
            For any issues, contact Granttank on Discord or Granttank2 in-game.
          </p>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

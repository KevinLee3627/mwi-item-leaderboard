export function IssueModal() {
  return (
    <div className='mx-auto grid place-items-center'>
      <button
        className='btn'
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

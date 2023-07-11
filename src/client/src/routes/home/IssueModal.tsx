import { CSSProperties } from 'react';

interface ChangelogProps {
  dialogId?: string;
  buttonTextAlign?: CSSProperties['textAlign'];
}

export function IssueModal({
  dialogId = 'issueModal',
  buttonTextAlign = 'center',
}: ChangelogProps) {
  return (
    <div className='grid place-items-center'>
      <button
        className={`text-white h-full w-full text-${buttonTextAlign}`}
        onClick={() => {
          const modal = document.getElementById(dialogId) as HTMLDialogElement;
          modal.showModal();
        }}
      >
        Issues?
      </button>
      <dialog id={dialogId} className='modal'>
        <form method='dialog' className='modal-box'>
          <p className='whitespace-normal'>
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

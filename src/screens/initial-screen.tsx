const InitialScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className='h-full flex items-center'>
      <div className='flex flex-col gap-10 w-3/4 sm:w-1/6 mx-auto'>
        <img src='/images/logo.svg' alt='Logo' className='w-44 mx-auto' />
        <h2 className='text-4xl font-bold text-center'>Photo Opp</h2>
        <button
          onClick={onStart}
          className='px-4 py-2 bg-[var(--primary)] button-transition text-white text-xl font-bold rounded-s-sm cursor-pointer'
        >
          Iniciar
        </button>
      </div>
    </div>
  );
};

export default InitialScreen;

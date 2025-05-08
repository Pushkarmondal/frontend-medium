export function Button({ type = 'signup' }: { type: 'signup' | 'signin' }) {
      return (
            <button className="px-8 py-2 rounded-md bg-blue-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-stone-500">
                  {type === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
      );
}

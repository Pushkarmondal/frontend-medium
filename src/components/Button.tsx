interface ButtonProps {
      type: 'signup' | 'signin';
      onClick?: () => void;
}

export const Button = ({ type, onClick }: ButtonProps) => {
      return (
            <button
                  onClick={onClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
                  {type === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
      );
};

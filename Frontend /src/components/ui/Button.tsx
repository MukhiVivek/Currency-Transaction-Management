interface ButtonProps {
    variant: 'primary' | 'secondary';
    onClick: () => void;
    startIcon?: any;
    endIcon?: any;
    title: string;
}

const variantclass = {
    primary: 'bg-red-700 text-white ',
    secondary: 'text-gray-900 bg-white hover:bg-gray-100 focus:ring-gray-400 focus:ring-offset-gray-100 focus:ring-2 focus:outline-none',
};


const Buttons = (prop : ButtonProps ) => {
    return (
        <button 
            onClick={prop.onClick}
            className={`pr-4 pl-1 py-1 rounded flex ${variantclass[prop.variant]}  `}
            type="button"
        
        >
            <div className="flex items-center justify-center px-2">
                {prop.startIcon}
            </div>  
            {prop.title}
            
        </button>
    );
};

export default Buttons;

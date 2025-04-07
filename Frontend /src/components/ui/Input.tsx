interface InputProps {
    variant: 'full' | 'underline';
    size: 'lg' | 'sm';
    title: string;
    type: 'string' | 'number';
    placeholder: string;
}

const variantclass = {
    full: 'border-white border rounded-md',
    underline: 'border-green-700 border-b '
};

// {
//     red: 'border-red-700 border rounded-md',
//     green: 'border-green-700 border rounded-md',
// }

const sizeclass = {
    lg: 'w-28',
    sm: 'w-9 text-center'
}



const Input = (prop : InputProps ) => {

    return (
        <div className="px-2 drop-shadow-md">
            <input type={prop.type}  className={` ${variantclass[prop.variant]} text-2xl ${sizeclass[prop.size]} `}  placeholder={prop.placeholder} />
        </div>
    );
};

export default Input;

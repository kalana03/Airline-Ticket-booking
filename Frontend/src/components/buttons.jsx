function Button(props) {

    const type = props.type;
    const value = props.value;
    const icon = props.icon;

    if (props.type === 'primary') {
        return (
            <button
            type="submit"
            className="flex items-center justify-center gap-4 h-12 px-10 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            <{icon} className="w-4 h-4" />
            {value}
          </button>
        )
    }
}
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

function useDebounce(value, delay) {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return debounce;
}

useDebounce.propTypes = {
    value:PropTypes.string.isRequired,
    delay:PropTypes.number.isRequired,
}

export default useDebounce;

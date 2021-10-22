import React from 'react';

const asyncComponent = (importComponent) => {

    return (props) => {
        const [component, setComponent] = React.useState(null);

        React.useEffect(() => {
            importComponent().then(cmp => {
                setComponent(cmp.default);
            });
        }, []);


        const C = component;

        return (
            C ? <C {...props} /> : null
        );

    }
}

export default asyncComponent;
import React, { useState, createContext, useContext, useEffect } from "react";
import uuid from "uuid/v4";

import { textInputField, numberInputField, boolInputField } from "./fields";

const HijackContext = createContext();

const sortTextFunc = (a, b) => {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
};

// Instantiates a debug input field for a variable
// Will output a debug field matching the variable type
const createInputField = (variable, index) => {
    const type = typeof variable.value;

    switch (type) {
        case "number":
            return numberInputField(
                variable.name,
                variable.value,
                variable.setter,
                index
            );
        case "string":
            return textInputField(
                variable.name,
                variable.value,
                variable.setter,
                index
            );
        case "boolean":
            return boolInputField(
                variable.name,
                variable.value,
                variable.setter,
                index
            );
        default:
            return <div key={index} />;
    }
};

const Hijack = ({ children }) => {
    const [debugFields, setDebugFields] = useState({});

    // Sort fields by variable name
    let fields = Object.keys(debugFields).map(fieldId => debugFields[fieldId]);
    fields = fields.sort((a, b) => sortTextFunc(a.name, b.name));

    const renderedFields = fields.map((variable, index) => {
        return createInputField(variable, index);
    });

    return (
        <div>
            <div style={styles.container}>{renderedFields}</div>

            <HijackContext.Provider value={[setDebugFields]}>
                {children}
            </HijackContext.Provider>
        </div>
    );
};

const styles = {
    container: {
        position: "absolute"
    }
};

const shallowClone = object => {
    return { ...object };
};

const useHijack = (variable, setter) => {
    const [setDebugFields] = useContext(HijackContext);

    const name = Object.keys(variable)[0];
    const value = variable[name];

    useEffect(
        () => {
            const id = uuid();

            setDebugFields(prev => {
                const fields = shallowClone(prev);
                fields[id] = { id, name, value, setter };
                return fields;
            });

            return () => {
                setDebugFields(prev => {
                    const fields = shallowClone(prev);
                    delete fields[id];
                    return fields;
                });
            };
        },
        [name, value, setter, setDebugFields]
    );
};

export { Hijack, useHijack };

import React, { useState } from "react";

// Generic input field for typing text or numbers
const textInputField = (name, value, setter, id) => {
    return (
        <div style={styles.container} key={id}>
            <span style={styles.label}>{name}</span>
            <input
                style={styles.textInput}
                type="text"
                value={value}
                onChange={e => setter(e.target.value)}
            />
        </div>
    );
};

const numberInputField = (name, value, setter, id) => {
    const converter = modifiedValue => {
        if (modifiedValue === "") modifiedValue = 0;

        modifiedValue = parseFloat(modifiedValue);

        if (isNaN(modifiedValue)) modifiedValue = value;

        setter(modifiedValue);
    };

    return textInputField(name, value, converter, id);
};

const boolInputField = (name, value, setter, id) => {
    return (
        <div style={styles.container} key={id}>
            <span style={styles.label}>{name}</span>
            <input
                style={styles.checkbox}
                type="checkbox"
                checked={value}
                onChange={e => setter(e.target.checked)}
            />
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        height: "2.5em",
        lineHeight: "2.5em",
        borderRadius: "0.2em",
        padding: "0px 2px 2px 2px",
        margin: "2px"
    },

    textInput: {
        border: "1px solid rgba(34,36,38,.15)",
        borderRadius: ".28571429rem",
        padding: ".67857143em 1em",
        color: "rgba(0,0,0,.95)",
        width: "100px",
        height: "0.8em"
    },

    checkbox: {
        height: "1.5em",
        width: "1.5em"
    },

    label: {
        color: "rgba(0,0,0,.87)",
        display: "inline-block",
        width: "6em",
        fontWeight: "300"
    }
};

export { textInputField, numberInputField, boolInputField };

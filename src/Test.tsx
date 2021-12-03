import SuperButton from "./common/superButton/SuperButton";
import SuperCheckbox from "./common/superCheckbox/SuperCheckbox";
import SuperInputText from "./common/superInputText/SuperInputText";
import React from "react";

export const Test = () => {
    return (
        <div>
            <div>
                <SuperButton>Button</SuperButton>
            </div>
            <div>
                <SuperCheckbox/>
            </div>
            <div>
                <SuperInputText/>
            </div>
        </div>
    )

}
import React from 'react';
import activeStar from '../../../../assets/images/activeStar.png'
import star from '../../../../assets/images/star.png'
import s from './Star.module.css'

type StarPropsType = {
    select: true | false
    setValue: () => void
}


export const Star = ({select, setValue}:StarPropsType) => {
    return (
        <div onClick={setValue} className={s.starContainer}>
            {select ? <ActivateStar/> : <DeActivateStar/>}
        </div>
    );
};

const ActivateStar = () => <img  src={activeStar} alt="activate"/>

const DeActivateStar = () => <img  src={star} alt="deactivate"/>

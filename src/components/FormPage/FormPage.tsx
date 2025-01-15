import React from "react";
import Header from "../Header/Header.tsx";
import Button from "../Button/Button.tsx";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
import './FormPage.css'
const FormPage = () =>{
    const handleSubmit = () => {
        console.log("Submit fetch");
    }; 

    const handleClear = () => {
        console.log("Clear form");
    }; 
    return (
        <>
            <div className="container">
                <Header/>
                <div className="title">
                    AML modle From
                    <div className="sub-title">Fill in the correct & accurate informtion of your model for best solution</div>
                </div>

                <div className="form-container">



                </div>

                <div className="button-container">
                    <div className="submit-clear-buttons">
                        <Button text="Submit Form" bgColor="submit-color" color="black-color" onClick={handleSubmit} Icon={SendRoundedIcon} ></Button>
                    </div>
                     <div className="submit-clear-buttons">
                        <Button text="Clear Form" bgColor="clear-color" color="black-color" onClick={handleClear} Icon={CancelScheduleSendRoundedIcon}></Button>
                    </div>
                </div>

            </div>
        </>
    )

}

export default FormPage; 
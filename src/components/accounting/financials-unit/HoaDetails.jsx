import classes from "./styles/FinanceUnitDetails.module.css";
import {convertToUSD} from "../../../utils/financeCalculations.js";
import {useState} from "react";
import {Button, Input, ButtonPlain} from "../../../ui/index.js";
import FinanceDetailsRow from "./FinanceDetailsRow.jsx";
const HoaDetails = ({ updateUnitFinance, hoa }) => {

    const { company, agent, phone, email, annualFee } = hoa

    const [editMode, setEditMode] = useState(!(company && agent && phone && email && annualFee))

    const [values, setValues] = useState({
        company: company || "",
        agent: agent || "",
        phone: phone || "",
        email: email || "",
        annualFee: annualFee || 0
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const cancel = () => {
        setValues({
            company: company || "",
            agent: agent || "",
            phone: phone || "",
            email: email || "",
            annualFee: annualFee || 0

        })
        setEditMode(false)
    }
    const update = () => {
        updateUnitFinance({ hoa: values })
        setEditMode(false)
    }

    return (
        <div className={classes.container}>
            <div className={classes.table}>
                <div className={classes.head}>
                    <div className={classes.title}>
                        Home Owners Association
                    </div>
                    <div className={classes.editDesktop}>
                        {!editMode && <ButtonPlain fontSize="14px" onClick={()=>setEditMode(!editMode)}>[Edit]</ButtonPlain>}
                    </div>
                </div>
                <div className={classes.body}>
                    <FinanceDetailsRow
                        label="Company"
                        display={(company && !editMode) ? values.company
                            :
                            <Input
                                name="company"
                                type="text"
                                value={values.company}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Agent"
                        display={(company && !editMode) ? values.agent
                            :
                            <Input
                                name="agent"
                                type="text"
                                value={values.agent}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Phone"
                        display={(phone && !editMode) ? values.phone
                            :
                            <Input
                                name="phone"
                                type="text"
                                value={values.phone}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Email"
                        display={(email && !editMode) ? values.email
                            :
                            <Input
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Annual Fee"
                        display={(annualFee && !editMode) ? convertToUSD(values.annualFee)
                            :
                            <Input
                                name="annualFee"
                                type="number"
                                value={values.annualFee}
                                onChange={handleChange}
                            />
                        }
                    />
                    {
                        editMode &&
                        <div className={classes.buttons}>
                            <Button onClick={update}>Update</Button>
                            <Button onClick={cancel}>Cancel</Button>
                        </div>
                    }
                </div>
            </div>
            <div className={classes.editMobile}>
                {!editMode && <Button onClick={()=>setEditMode(!editMode)}>Edit</Button>}
            </div>
        </div>
    );
};

export default HoaDetails;
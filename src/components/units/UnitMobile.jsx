import classes from "./styles/UnitMobile.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

const UnitMobile = ({ unit }) => {

    const { houseNumber, street, city, apartmentNumber, state, zip, image, tenant, user } = unit

    // remove all non-digit chars in phone number to dial in phone app
    const phone = unit.tenant?.phone?.replace(/[^0-9]/g, "")

    // state function to hide and show create new message
    const [showMessageForm, setShowMessageForm] = useState(false)

    return (
        <div className={classes.container}>
            <Card>
                <div className={classes.content}>

                    <div className={classes.image}>
                        <img src={image} alt="img" className={classes.image}/>
                    </div>

                    <div className={classes.info}>
                        <div className={classes.address}>
                            <div className={classes.addressLine1}>
                                <NavLink
                                    to={{ pathname: `../accounting/${unit._id }`}}
                                    state={{ houseNumber, street, apartmentNumber, city, state, zip, tenant, user }}
                                    className={classes.link}
                                >
                                   {houseNumber} {street} {apartmentNumber}
                                </NavLink>
                            </div>
                            <div className={classes.addressLine2}>
                                {city}, {state} {zip}
                            </div>
                        </div>

                        {
                            user &&
                            <div className={classes.tenant}>
                                <div className={classes.tenantName}>
                                    Tenant: {tenant.firstName} {tenant.lastName}
                                </div>


                            </div>
                        }
                    </div>

                    <div className={classes.buttons}>
                        <a href={`tel:${phone}`}>
                            <div className={classes.button}>
                                <Button>Call</Button>
                            </div>
                        </a>
                        <div className={classes.button}>
                            <Button onClick={() => setShowMessageForm(true)}>Message</Button>
                        </div>
                    </div>

                </div>

                    <div className={classes.forms}>
                        {/* forms open when state toggled */}

                        {/* showMessageForm &&
                          <CreateMessageForm
                            cancel={()=>setShowMessageForm(false)}
                            addressBook={[{
                                text: `${tenant.lastName}, ${tenant.firstName}`,
                                value: user
                            }]}
                          />*/
                        }
                    </div>



            </Card>
        </div>
    );
};

export default UnitMobile;
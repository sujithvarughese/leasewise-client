import * as yup from "yup"
import * as Yup from 'yup'

const passwordValidation = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
const passwordValidationBasic = /^(?=.*[a-z]).{6,16}$/

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address"),
  password: Yup
    .string()
    .min(8)
    .matches(passwordValidationBasic, { message: "Invalid Password" })

})

export const registerSchema = yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email address").required("Required"),
  password: Yup
    .string()
    .min(8)
    .matches(passwordValidation, { message: "Invalid Password" })
    .required("Required"),
  confirmPassword: Yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required()
})

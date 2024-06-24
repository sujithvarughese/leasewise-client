import classes from "./styles/Research.module.css";
import { axiosHUD } from "../utilities/axios.js";
import { useState } from "react";
import { Form } from 'formik'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
const Research = () => {

  const [counties, setCounties] = useState([])
  const [fmrByZip, setFmrByZip] = useState([])
  const [fmrData, setFmrData] = useState(null)

  const [county, setCounty] = useState("")
  const [zip, setZip] = useState("")
  const year = 2023
  // after user selects a state, fetch a list of counties and the county code, then prompt user for county
  const getCountyList = (stateCode) => {
    const fetchData = async () => {
      try {
        // retrieves list of counties { state_code, fips_code, county_name, town_name, category }
        const response = await axiosHUD(`/listCounties/${stateCode}`)
        // we need only county_name to populate list and fips_code to then fetch by code
        const counties = response.data.map(county => {
          return {
            text: county.county_name,
            value: county.fips_code
          }
        })
        // form will only populate list if counties state array length > 0
        setCounties(counties)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }

  // after user selects county, fetch a list of zip codes(if metro county) with FMR list
  const getZipCodeList = (county) => {
    setCounty(county.text)
    setZip("")
    const fetchData = async () => {
      try {
        // retrieve list { zip_code, Efficiency, One-Bedroom, Two-Bedroom, Three-Bedroom, Four-Bedroom }
        const response = await axiosHUD(`/data/${county.value}?year=${year}`)
        // if classified as small area, data is not seperated by zipcodes
        if (response.data.data.smallarea_status === "0") {
          setFmrData(response.data.data.basicdata)
        } else {
          const zipCodes = response.data.data.basicdata
          // form will only display zip codes to user once state array is populated
          setFmrByZip(zipCodes)
          console.log(zipCodes)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }

  const handleChangeStateCode = (e) => {
    // to clear values in case user picks different state after selecting zip
    setFmrByZip([])
    setFmrData(null)
    getCountyList(e.target.value)
  }

  const handleChangeCounty =(e) => {
    setFmrByZip([])
    setFmrData(null)
    const county = counties.find(county => county.value === e.target.value)
    getZipCodeList(county);
  }

  // set our final data to display
  const handleSelectZipCode = (e) => {
    const data = fmrByZip.find(zip => zip.zip_code === e.target.value)
    setZip(e.target.value)
    setFmrData(data)
  }

  return (
    <div className={classes.container}>
      <div className="title">
        Search for Fair Market Rent Values:
      </div>

      <div>
        <div className={classes.form}>
          <form>
            <label htmlFor="state">State</label>
              <Select
                type="text"
                name="state"
                list={states}
                onChange={handleChangeStateCode}
              >
                {states.map(state => {
                return (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                )
              })}
              </Select>

            {
              counties.length > 0 &&
              <>
              <label htmlFor="county">County</label>
              <Select
                type="text"
                name="county"
                list={counties}
                onChange={handleChangeCounty}
              >
                {counties.map(county => {
                  return (
                    <MenuItem key={county} value={county.value}>{county.text}</MenuItem>
                  )
                })}
              </Select>
              </>

            }
            {
              fmrByZip?.length > 0 &&
              <>
              <label htmlFor="zip">Zip Code</label>
                  <Select
                    type="text"
                    name="zip"
                    list={fmrByZip.map(zip => zip.zip_code)}
                    onChange={handleSelectZipCode}
                  >
                    {fmrByZip.map(zip => {
                      return (
                        <MenuItem key={zip.zip_code} value={zip.zip_code}>{zip.zip_code}</MenuItem>
                      )
                    })}
                  </Select>
              </>

            }
          </form>
        </div>

        {
          fmrData &&
          <div className={classes.table}>
            <div className={classes.head}>
              Fair Market Rent Values for {county}
              { zip && <span className={classes.zipResult}>{`: ${zip}`}</span> }
            </div>

            <div className={classes.body}>
              <div className={classes.tr}>
                <div className={classes.td}>Efficiency</div>
                <div className={classes.td}>${fmrData["Efficiency"]}</div>
              </div>
              <div className={classes.tr}>
                <div className={classes.td}>One-Bedroom</div>
                <div className={classes.td}>${fmrData["One-Bedroom"]}</div>
              </div>
              <div className={classes.tr}>
                <div className={classes.td}>Two-Bedroom</div>
                <div className={classes.td}>${fmrData["Two-Bedroom"]}</div>
              </div>
              <div className={classes.tr}>
                <div className={classes.td}>Three-Bedroom</div>
                <div className={classes.td}>${fmrData["Three-Bedroom"]}</div>
              </div>
              <div className={classes.tr}>
                <div className={classes.td}>Four-Bedroom</div>
                <div className={classes.td}>${fmrData["Four-Bedroom"]}</div>
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  );
};

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

export default Research;
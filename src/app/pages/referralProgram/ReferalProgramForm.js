import React from "react";
import { TextField, Checkbox, FormControlLabel, Button, makeStyles, Typography, Select, MenuItem, Radio, RadioGroup } from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { Formik, FieldArray } from "formik";
import useAxios from 'axios-hooks'
import { DatePicker } from "@material-ui/pickers";

const REWARD_TYPE_ENUM = {
  STORED_CREDIT: "Stored_credit",
  GIFT: "Gift",
  FREE_PRODUCT: "Free_product",
  DISCOUNT: "Discount",
}

const useStyles = makeStyles({
  root: {
    minWidth: '30px'
  },
});

export const ReferalProgramForm = ({ onHide, referralProgram, edit }) => {
  const classes = useStyles();
  const [{ data, loading, error }, doPost] = useAxios({
    url: '/referralProgram/',
    method: 'POST'
  }, { manual: true })

  return (
    <>
      <Dialog fullWidth onClose={onHide} open={true}>
        <DialogTitle id="simple-dialog-title">
          {!edit ? "Create a Referral Program" : `Edit ${referralProgram.name}`}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              id: referralProgram.id,
              name: referralProgram.name,
              endDate: referralProgram.endDate || new Date(),
              isActive: referralProgram.isActive || false,
              SocialShares: referralProgram.SocialShares || [],
              noEndDate: !referralProgram.name ? false : referralProgram && !referralProgram.endDate ? true : false,

              giftCount: 1,
              rewardType: REWARD_TYPE_ENUM.STORED_CREDIT,
              gifts: [],
              emailTemplate: "",
              setCreditExpiryDate: false,
              creditExpiryDate: undefined,
              setMaxCreditPerCustomer: false,
              maxCreditPerCustomer: null,
              freeProduct: null,

              rewardFriendType: REWARD_TYPE_ENUM.DISCOUNT,
              discountAmount: 0,
              discountUnit: "",
            }}
            validate={values => {
              const errors = {};

              if (!values.name) errors.name = "Field required"
              if (values.noEndDate == false) {
                if (!values.endDate) errors.endDate = "Field required"
              }

              return errors;
            }}
            onSubmit={(data, { setStatus, setSubmitting }) => {
              doPost({ data })
                .then(() => onHide("CREATED"))
                .catch(err => err && err.response && setStatus(err.response.data.message))
            }}
          >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting
            }) => (
                <form
                  autoComplete="off"
                  className="kt-form"
                  onSubmit={handleSubmit}
                >
                  {status && (
                    <div role="alert" className="alert alert-danger">
                      <div className="alert-text">{status}</div>
                    </div>
                  )}

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <TextField
                      label="Name"
                      margin="normal"
                      className="kt-width-full"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      helperText={touched.name && errors.name}
                      error={Boolean(touched.name && errors.name)}
                    />
                  </div>

                  {values.noEndDate == false && (
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <DatePicker
                        fullWidth
                        placeholder="End Date"
                        helperText={touched.endDate && errors.endDate}
                        error={Boolean(touched.endDate && errors.endDate)}
                        autoOk
                        disableToolbar
                        variant="inline"
                        value={values.endDate}
                        onChange={(d) => setFieldValue("endDate", d)}
                      />
                    </div>
                  )}

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <FormControlLabel
                      control={<Checkbox checked={values.noEndDate} onChange={() => {
                        setFieldValue("noEndDate", !values.noEndDate)
                        setFieldValue("endDate", null)
                      }} name="checkedA" />}
                      label="No End Date"
                    />
                  </div>

                  <div className="form-group">
                    <FormControlLabel
                      control={<Checkbox checked={values.isActive} onChange={() => {
                        setFieldValue("isActive", !values.isActive)
                      }} name="checkedA" />}
                      label="Is Active"
                    />
                  </div>
                  <Typography variant="h6" gutterBottom>
                    Create a Reward for your customer
                  </Typography>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.rewardType}
                    onChange={(e) => setFieldValue("rewardType", e.target.value)}
                  >
                    <MenuItem value={REWARD_TYPE_ENUM.STORED_CREDIT}>Stored Credit</MenuItem>
                    <MenuItem value={REWARD_TYPE_ENUM.GIFT}>Gift</MenuItem>
                    <MenuItem value={REWARD_TYPE_ENUM.FREE_PRODUCT}>Free Product</MenuItem>
                  </Select>
                  {values.rewardType == REWARD_TYPE_ENUM.STORED_CREDIT && (
                    <>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <TextField
                          label="Email Template"
                          multiline={true}
                          rows={3}
                          margin="normal"
                          className="kt-width-full"
                          name="emailTemplate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.emailTemplate}
                          helperText={touched.emailTemplate && errors.emailTemplate}
                          error={Boolean(touched.emailTemplate && errors.emailTemplate)}
                        />
                      </div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.setCreditExpiryDate}
                            onChange={() => setFieldValue("setCreditExpiryDate", !values.setCreditExpiryDate)}
                            color="primary"
                          />
                        }
                        label="Set a store credit expiry date"
                      />
                      {values.setCreditExpiryDate == true && (
                        <div className="form-group">
                          <DatePicker
                            fullWidth
                            placeholder="Credit Expiry Date"
                            helperText={touched.creditExpiryDate && errors.creditExpiryDate}
                            error={Boolean(touched.creditExpiryDate && errors.creditExpiryDate)}
                            autoOk
                            disableToolbar
                            variant="inline"
                            value={values.creditExpiryDate}
                            onChange={(d) => setFieldValue("creditExpiryDate", d)}
                          />
                        </div>
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.setMaxCreditPerCustomer}
                            onChange={() => setFieldValue("setMaxCreditPerCustomer", !values.setMaxCreditPerCustomer)}
                            color="primary"
                          />
                        }
                        label="Set a maximum store credit your customer can have"
                      />
                      {values.setMaxCreditPerCustomer == true && (
                        <div className="form-group col-md-6" style={{ marginBottom: 0 }}>
                          <TextField
                            label={`Store Credit Maximum`}
                            margin="normal"
                            className="kt-width-full"
                            name={`maxCreditPerCustomer`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.maxCreditPerCustomer}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {values.rewardType == REWARD_TYPE_ENUM.FREE_PRODUCT && (
                    <>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.customerFreeProduct}
                        onChange={(e) => setFieldValue("customerFreeProduct", e.target.value)}
                      >
                        <MenuItem value={1}>Product A</MenuItem>
                        <MenuItem value={2}>Product B</MenuItem>
                        <MenuItem value={3}>Product C</MenuItem>
                        <MenuItem value={4}>Product E</MenuItem>
                      </Select>
                    </>
                  )}
                  {values.rewardType == REWARD_TYPE_ENUM.GIFT && (
                    <div className="form-group">
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.giftCount}
                        onChange={(e) => setFieldValue("giftCount", e.target.value)}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                      <FieldArray
                        name="gifts"
                        render={arrayHelpers => (
                          <div>
                            {Array(values.giftCount).fill('a').map((gift, index) => (
                              <div style={{ flexDirection: 'row', display: 'flex' }}>
                                <div className="form-group col-md-6" style={{ marginBottom: 0 }}>
                                  <TextField
                                    label={`Define Gift ${index + 1}`}
                                    margin="normal"
                                    className="kt-width-full"
                                    name={`gifts[${index}].name`}
                                    onBlur={handleBlur}
                                    onChange={(e) => arrayHelpers.replace(index, { ...gift, name: e.target.value })}
                                    value={gift.name}
                                  />
                                </div>
                                <div className="form-group col-md-6" style={{ marginBottom: 0 }}>
                                  <TextField
                                    label={`Number of referral to get Gift ${index + 1}`}
                                    margin="normal"
                                    className="kt-width-full"
                                    name={`gifts[${index}].referralId`}
                                    onBlur={handleBlur}
                                    onChange={(e) => arrayHelpers.replace(index, { ...gift, referralId: e.target.value })}
                                    value={gift.referralId}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    </div>
                  )}
                  <Typography variant="h6" gutterBottom style={{ marginTop: '4%'}}>
                    Create a Reward for their friend
                  </Typography>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.rewardFriendType}
                    onChange={(e) => setFieldValue("rewardFriendType", e.target.value)}
                  >
                    <MenuItem value={REWARD_TYPE_ENUM.DISCOUNT}>{REWARD_TYPE_ENUM.DISCOUNT}</MenuItem>
                    <MenuItem value={REWARD_TYPE_ENUM.FREE_PRODUCT}>Free Product</MenuItem>
                  </Select>

                  {values.rewardFriendType == REWARD_TYPE_ENUM.DISCOUNT && (
                    <>
                      <div style={{ marginBottom: 0 }}>
                        <TextField
                          label={`Store Credit Maximum`}
                          margin="normal"
                          className="kt-width-full"
                          name={`discountAmount`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.discountAmount}
                        />
                      </div>
                      <RadioGroup aria-label="gender" name="discountUnit" value={values.discountUnit} onChange={handleChange}>
                        <FormControlLabel value="%" control={<Radio />} label="%" />
                        <FormControlLabel value="€" control={<Radio />} label="€" />
                      </RadioGroup>
                    </>
                  )}
                  {values.rewardFriendType == REWARD_TYPE_ENUM.FREE_PRODUCT && (
                    <>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.friendFreeProduct}
                        onChange={(e) => setFieldValue("friendFreeProduct", e.target.value)}
                      >
                        <MenuItem value={1}>Product A</MenuItem>
                        <MenuItem value={2}>Product B</MenuItem>
                        <MenuItem value={3}>Product C</MenuItem>
                        <MenuItem value={4}>Product E</MenuItem>
                      </Select>
                    </>
                  )}

                  <div style={{ marginTop: '1rem' }} className="kt-login__actions">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => onHide("CANCELLED")}
                      disabled={loading}
                    >
                      Cancel
                  </Button>
                  </div>
                </form>
              )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReferalProgramForm;

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  TextField,
  Box,
  Grid,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import "./styles.css";
import { makeStyles, Typography, Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const stripePromise = loadStripe(
  "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
);

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#fff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "'Poppins', sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fff",
      },
      "::placeholder": {
        color: "#fff",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#fff",
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formGroups: {
    "& .ElementsApp, .ElementsApp .InputElement": {
      color: "#c61175fa",
    },
    color: "#fff",
    // background: "#52565c",
    "& ..FormRowLabel": {
      color: "#fff",
    },
    "& .FormRowInput": {
      "& :-webkit-autofill": {
        color: "black",
      },
    },
  },
  SubmitButton: {
    color: "#fff",
    backgroundColor: "#819efc",
    boxShadow:
      "0 6px 9px rgb(50 50 93 / 6%), 0 2px 5px rgb(0 0 0 / 8%), inset 0 1px 0 #f222222",
  },
}));

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  maxlength,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      maxlength={maxlength}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#000"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#000"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#000"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CheckoutForm = ({
  planId,
  madePayment,
  planPrice,
  currentPlan,
  paymentLoader,
  size,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [loader, setloader] = useState(false);
  const [countryCodeNew, setCountryCodeNew] = useState("");

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });
  const isValidEmail = (value) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    return re.test(String(value).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloader(true);

    if (!stripe || !elements) {
      setloader(false);

      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      setloader(false);

      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
      setloader(false);
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    setProcessing(false);
    setloader(true);

    if (payload.error) {
      setError(payload.error);
      setloader(false);
    } else {
      setPaymentMethod(payload.paymentMethod);
      console.log("Payment Done");
      madePayment(planId);
      setloader(false);
    }
  };
  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: "",
    });
  };

  const classes = useStyles();
  return planPrice === 1000 ? (
    <form
      className={classes.formGroups}
      // className="Form"
      onSubmit={handleSubmit}
    >
      <Box mb={2}>
        <Typography
          style={{ color: "black", marginBottom: "10px", fontWeight: 600 }}
          variant="h4"
        >
          Enter your card details
        </Typography>
      </Box>

      {/* <fieldset className={classes.formGroups} className="FormGroup"> */}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <Typography><strong>Name :</strong></Typography> */}
          <TextField
            // label="Name"
            id="name"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Please enter your name"
            required
            autoComplete="name"
            value={billingDetails.name}
            style={{ color: "#000" }}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, name: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Typography><strong>Email :</strong></Typography> */}
          <TextField
            // label="Email"
            id="email"
            type="email"
            fullWidth
            variant="outlined"
            placeholder="Please enter email"
            required
            autoComplete="email"
            value={billingDetails.email}
            style={{ color: "#000" }}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, email: e.target.value });
            }}
          />
          <FormHelperText error>
            {billingDetails.email !== "" &&
              !isValidEmail(billingDetails.email) &&
              "Enter valid email"}
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          {/* <Typography><strong>Phone No. :</strong></Typography> */}
            {/* <Typography><strong>Phone No. :</strong></Typography> */}
            {/* <TextField
              id="phone"
              type="number"
              fullWidth
              variant="outlined"
              placeholder="Please enter mobile no."
              required
              autoComplete="tel"
              maxlength="14"
              value={billingDetails.phone}
              style={{ color: "#fff" }}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, phone: e.target.value });
              }}
            />
            <FormHelperText error>
              {billingDetails.phone.length >= 12 && "Enter valid number"}
            </FormHelperText> */}

          <PhoneInput
            country={"us"}
            name="mobileNumber"
            placeholder="Please enter mobile no."
            value={billingDetails.phone}
            fullWidth="true"
            // error={Boolean(touched.mobileNumber && errors.mobileNumber)}
            // onBlur={handleBlur}
            // onChange={(phone) => handlePhoneChange(phone)}
            onChange={(phone, e) => {
              setCountryCodeNew(e.dialCode);
              setBillingDetails({ ...billingDetails, phone });
            }}
            inputStyle={{
              width: "100%",
              height: "45px",
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <fieldset 
          // className={classes.formGroups
          // } 
          className="FormGroup"
          >
            <CardField
              style={{ color: "#000" }}
              onChange={(e) => {
                setError(e.error);
                setCardComplete(e.complete);
              }}
            />
          </fieldset>
        </Grid>
      </Grid>

      {/* <Field
        variant="outlined"
        id="outlined-basic"
          label="Name"
          id="name"
          type="text"
          placeholder="Please enter your name"
          required
          autoComplete="name"
          value={billingDetails.name}
          style={{ color: "#fff" }}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="Please enter Email"
          required
          autoComplete="email"
          value={billingDetails.email}
          style={{ color: "#fff" }}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="Please enter Mobile no."
          required
          autoComplete="tel"
          maxlength="14"
          value={billingDetails.phone}
          style={{ color: "#fff" }}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        /> */}
      {/* </fieldset> */}
      {/* <fieldset className={classes.formGroups} className="FormGroup">
        <CardField
          style={{ color: "#fff" }}
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset> */}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton
        processing={processing}
        error={error}
        fullWidth
        disabled={
          !stripe || billingDetails.phone ==="" ||
          !isValidEmail(billingDetails.email)
        }
      >
        Pay ${planPrice}{" "}
        {paymentLoader && (
          <CircularProgress
            size={size ? size : 20}
            thickness={size ? (size / 5) * 24 : 5}
            style={{ color: "white" }}
          />
        )}
      </SubmitButton>
    </form>
  ) : (
    <div className="Result">
      {/* <div className="ResultTitle" role="alert">
        Payment successful &nbsp;&nbsp;
        <span style={{ marginTop: "40px" }}>
          <CheckCircleIcon />
        </span>
      </div> */}
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod:
      </div>
      <Button onClick={() => madePayment(planId)}>
        Done
        {paymentLoader && <ButtonCircularProgress />}
      </Button>
    </div>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const Payment = ({
  planId,
  madePayment,
  planPrice,
  currentPlantType,
  paymentLoader,
}) => {
  console.log("currentPlantType..", currentPlantType);

  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm
          paymentLoader={paymentLoader}
          planId={planId}
          madePayment={madePayment}
          planPrice={planPrice}
          currentPlan={currentPlantType}
        />
      </Elements>
    </div>
  );
};

export default Payment;

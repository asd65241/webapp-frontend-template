import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../../api/axios";
import endpoints from "../../api/endpoints";

import Message from "../message/Message";

const Verify = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  let { verify_token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(verify_token);

    const verifyToken = async () => {
      try {
        const res = await axios.post(endpoints.VERIFY_URL, {
          id: verify_token,
        });
        console.log(res);
      } catch (err) {
        console.error(err.response);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (hasError) {
      return <Message message="Invalid verification token!" />;
    } else {
      return <Message message="User is successfully verified!" />;
    }
  }
};

export default Verify;

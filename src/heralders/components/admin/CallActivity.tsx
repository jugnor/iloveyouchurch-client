import {Activity} from "../../models/Activity";
import useSWR, {SWRResponse} from "swr";
import {ResultsObject} from "../util/ResultsObject";
import {ActivityType} from "../../models/ActivityType";
import {ActivityOrder} from "../../models/ActivityOrder";
import axios from "axios";
import {useKeycloak} from '@react-keycloak/web';

export const getActivities = (postboxId: string, type: ActivityType): SWRResponse<ResultsObject<Activity>, Error> => {
  return useSWR<ResultsObject<Activity>>(`/postboxes/${postboxId}/activity-results?type=${type}`);
};

export const getActivity = (postboxId: string, type: ActivityType, order: ActivityOrder): Activity | undefined => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const {keycloak} = useKeycloak();

  const fetcher = (url: string) => axios.request({
    headers: {
      Authorization: keycloak.token
        ? `Bearer ${keycloak.token}`
        : undefined,
      'Content-type': 'application/json',
    },
    method: "GET",
    responseType: 'json',
    url: `${apiUrl}${encodeURI(url)}`
  }).then(res => {
    console.log(res)
    if (res.status === 404) {
      console.log("SSSSS")
      return ""
    } else {
      return res.data
    }
  })

  const {
    data,
    error
  } = useSWR<Activity>(`/postboxes/${postboxId}?type=${type}&order=${order}`, fetcher);


  /* if(error!==undefined){
     console.log("es gibt error")
     //console.log(error.status)
     return "";
   }*/
  return data;

};

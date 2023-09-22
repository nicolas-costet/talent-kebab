import {FormInstance} from "antd";
import {TripPlannerData} from "@components/views/TripPlannerScreen";

export interface StepPropsType {
    next: () => void;
    form: FormInstance,
    tripPlanner: TripPlannerData,
    setTripPlanner: (newDatas: TripPlannerData) => void;
}

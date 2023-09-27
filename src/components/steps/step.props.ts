import {FormInstance} from "antd";
import {TripPlannerData} from "@views/TripPlannerScreen/TripPlannerScreen";

export interface StepPropsType {
    next: () => void;
    form: FormInstance,
    tripPlanner: TripPlannerData,
    setTripPlanner: (newData: TripPlannerData) => void;
}

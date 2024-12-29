export interface LostPerson {
  _id: string;
  fullname: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  describe_appearance: string;
  last_seen_location: string;
  follow_up_name: string;
  follow_up_phone: string;
  follow_up_email: string;
  follow_up_address: string;
  detected_near: string | null;
  is_detected: boolean;
  status: "Active" | "Detected" | "Closed";
  lost_person_img: string;
}

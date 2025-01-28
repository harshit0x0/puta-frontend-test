export interface Member {
  _id: number;
  name: string;
  position: string;
  designation: string;
  department: string;
  role: string;
  college: string;
  mobileNo: string;
  endOfMembership: string;
}

export interface Activity {
  _id?: number
  name: string;
  description: string;
  url: string;
  cloudinaryId: string;
  fileType: "image";
  createdAt?: string;
  updatedAt?: string;
}
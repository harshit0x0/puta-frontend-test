// "use client";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/items";

// import { Input } from "@/components/ui/items";
// import { Label } from "@/components/ui/items";
// import { Plus, Pencil, Trash2, Search, Calendar } from "lucide-react";
// import Image from "next/image";

// interface DialogProps {
//   isOpen: boolean;
//   onOpenChange: (isOpen: boolean) => void;
//   children: React.ReactNode;
// }

// const Dialog: React.FC<DialogProps> = ({ isOpen, onOpenChange, children }) => {
//   if (!isOpen) return null;

//   const handleClose = () => {
//     onOpenChange(false);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div
//         className="bg-black bg-opacity-50 fixed inset-0"
//         onClick={handleClose}
//       />
//       <div className="bg-white rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
//         {children}
//       </div>
//     </div>
//   );
// };

// // DialogContent component
// interface DialogContentProps {
//   children: React.ReactNode;
// }

// const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
//   return <div className="space-y-4 p-4 md:p-6 lg:p-8 xl:p-10">{children}</div>;
// };

// // DialogHeader component
// interface DialogHeaderProps {
//   children: React.ReactNode;
// }

// const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
//   return (
//     <div className="flex justify-between items-center mb-4 md:mb-6 lg:mb-8 xl:mb-10">
//       {children}
//     </div>
//   );
// };

// // DialogTitle component
// interface DialogTitleProps {
//   children: React.ReactNode;
// }

// const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
//   return (
//     <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 xl:mb-8">
//       {children}
//     </h3>
//   );
// };

// // DialogFooter component
// interface DialogFooterProps {
//   children: React.ReactNode;
// }

// const DialogFooter: React.FC<DialogFooterProps> = ({ children }) => {
//   return (
//     <div className="flex justify-end space-x-3 mt-6 md:mt-8 lg:mt-10 xl:mt-12">
//       {children}
//     </div>
//   );
// };

// // Types
// interface Activity {
//   id: string;
//   title: string;
//   date: string;
//   description: string;
//   image: string;
//   status: "published" | "draft";
// }

// interface ActivityFormData {
//   title: string;
//   date: string;
//   description: string;
//   image: string;
//   status: "published" | "draft";
// }

// // Activity List Component
// const ActivitiesList: React.FC = () => {
//   const [activities, setActivities] = useState<Activity[]>([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
//     null
//   );
//   const [searchQuery, setSearchQuery] = useState("");

//   // Table Component
//   const ActivityTable: React.FC = () => (
//     <div className="overflow-x-auto bg-white rounded-lg shadow">
//       <table className="w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="p-4 text-left">Title</th>
//             <th className="p-4 text-left hidden md:table-cell">Date</th>
//             <th className="p-4 text-left hidden md:table-cell">Status</th>
//             <th className="p-4 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {activities
//             .filter(
//               (activity) =>
//                 activity.title
//                   .toLowerCase()
//                   .includes(searchQuery.toLowerCase()) ||
//                 activity.description
//                   .toLowerCase()
//                   .includes(searchQuery.toLowerCase())
//             )
//             .map((activity) => (
//               <tr key={activity.id} className="border-t">
//                 <td className="p-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 relative hidden sm:block">
//                       <Image
//                         src={activity.image}
//                         alt={activity.title}
//                         layout="fill"
//                         className="rounded-md object-cover"
//                       />
//                     </div>
//                     <span className="font-medium">{activity.title}</span>
//                   </div>
//                 </td>
//                 <td className="p-4 hidden md:table-cell">{activity.date}</td>
//                 <td className="p-4 hidden md:table-cell">
//                   <span
//                     className={`px-2 py-1 rounded-full text-sm ${
//                       activity.status === "published"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {activity.status}
//                   </span>
//                 </td>
//                 <td className="p-4">
//                   <div className="flex space-x-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleEdit(activity)}
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleDelete(activity)}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   // Activity Form Component
//   const ActivityForm: React.FC<{
//     initialData?: ActivityFormData;
//     onSubmit: (data: ActivityFormData) => void;
//     onCancel: () => void;
//   }> = ({ initialData, onSubmit, onCancel }) => {
//     const [formData, setFormData] = useState<ActivityFormData>(
//       initialData || {
//         title: "",
//         date: "",
//         description: "",
//         image: "",
//         status: "draft",
//       }
//     );

//     return (
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSubmit(formData);
//         }}
//         className="space-y-4"
//       >
//         <div>
//           <Label htmlFor="title">Title</Label>
//           <Input
//             id="title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             className="mt-1"
//             required
//           />
//         </div>

//         <div>
//           <Label htmlFor="date">Date</Label>
//           <Input
//             id="date"
//             type="date"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//             className="mt-1"
//             required
//           />
//         </div>

//         <div>
//           <Label htmlFor="description">Description</Label>
//           <textarea
//             id="description"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//             className="mt-1"
//             rows={4}
//             required
//           />
//         </div>

//         <div>
//           <Label htmlFor="image">Image URL</Label>
//           <Input
//             id="image"
//             value={formData.image}
//             onChange={(e) =>
//               setFormData({ ...formData, image: e.target.value })
//             }
//             className="mt-1"
//             required
//           />
//         </div>

//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">
//             {initialData ? "Update Activity" : "Create Activity"}
//           </Button>
//         </DialogFooter>
//       </form>
//     );
//   };

//   const handleAdd = () => setIsAddModalOpen(true);
//   const handleEdit = (activity: Activity) => {
//     setSelectedActivity(activity);
//     setIsEditModalOpen(true);
//   };
//   const handleDelete = (activity: Activity) => {
//     setSelectedActivity(activity);
//     setIsDeleteModalOpen(true);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-blue-900 mb-4 md:mb-0">
//           Manage Activities
//         </h1>
//         <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search activities..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Button onClick={handleAdd} className="whitespace-nowrap">
//             <Plus className="h-4 w-4 mr-2" /> Add Activity
//           </Button>
//         </div>
//       </div>

//       <ActivityTable />

//       {/* Add Activity Modal */}
//       <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Activity</DialogTitle>
//           </DialogHeader>
//           <ActivityForm
//             onSubmit={(data) => {
//               // Handle create logic here
//               setIsAddModalOpen(false);
//             }}
//             onCancel={() => setIsAddModalOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>

//       {/* Edit Activity Modal */}
//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Activity</DialogTitle>
//           </DialogHeader>
//           {selectedActivity && (
//             <ActivityForm
//               initialData={selectedActivity}
//               onSubmit={(data) => {
//                 // Handle update logic here
//                 setIsEditModalOpen(false);
//               }}
//               onCancel={() => setIsEditModalOpen(false)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Modal */}
//       <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Activity</DialogTitle>
//           </DialogHeader>
//           <div className="py-4">
//             <p>
//               Are you sure you want to delete this activity? This action cannot
//               be undone.
//             </p>
//           </div>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsDeleteModalOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={() => {
//                 // Handle delete logic here
//                 setIsDeleteModalOpen(false);
//               }}
//             >
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ActivitiesList;

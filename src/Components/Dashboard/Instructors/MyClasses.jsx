import { Helmet } from "react-helmet-async";
import useAddedClass from "../../../Hooks/useAddedClass";
import SkeletonRow from "../../UI/SkeletonRow";

const MyClasses = () => {

    const [addedclasses, , loading] = useAddedClass()
    return (
        <div className="text-center">
            <Helmet>
                <title>Sports Zone | My Classes</title>
            </Helmet>

            <h1 className="my-10 font-bold text-4xl">My Classes</h1>

            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full text-center">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Class Name</th>
                                <th>Available Seats</th>
                                <th>Enrolled</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                            ) : (
                                addedclasses.map((addedClass) =>
                                    <tr key={addedClass._id}>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={addedClass.image} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{addedClass.name}</div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{addedClass.availableSeats}</div>
                                        </td>
                                        <td>{addedClass.numStudents}</td>

                                        <th>
                                            {
                                                !addedClass.status ?
                                                    <><span>Pending...</span></>
                                                    :
                                                    <>
                                                        {addedClass.status}
                                                    </>
                                            }

                                            <br />

                                            <label htmlFor="my_modal_6" disabled={addedClass.status === 'Approved' || !addedClass.status} className="btn btn-xs bg-orange-800 hover:bg-gradient-to-r from-slate-800 to-orange-800 text-white border-none mt-3">Feedback</label>
                                            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                                            <div className="modal">
                                                <div className="modal-box">
                                                    <p className="flex mt-20 justify-center">Update Your Info To Get Approved Again!</p>
                                                    <div className="modal-action">
                                                        <label htmlFor="my_modal_6" className="btn">Ok</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <button className="btn btn-xs bg-orange-800 hover:bg-gradient-to-r from-slate-800 to-orange-800 text-white border-none mt-2 mx-2 ">Update</button>
                                            </div>
                                        </th>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyClasses;
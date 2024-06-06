import React, { useEffect } from "react";
import axios from "axios";

export default function ModalEdit({ isOpen, closeModal, judulModal, inputData }) {
    if (!isOpen) {
        return null;
    }
    const [dataDetail, setDataDetail] = useState([]);
    useEffect(() => {
        axios.get(endpoints['detail'], {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setDataDetail(res.data.data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function handleUpdate(e) {
        e.prevenDefault();
        axios.patch(endpoints['update'], {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    function handleChange (){
        const {name, value} = e.target;
        setDataDetail(dataSebelumnya => ({
            ...dataSebelumnya,[nama]:value
        }))
    }

    return (
        <>
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <div class="relative p-4 w-full max-w-md max-h-full">

                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Edit Data {judulModal}
                            </h3>
                            <button onClick={closeModal} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-4 md:p-5">
                            <form class="space-y-4" onSubmit={handleUpdate}>
                            {
                                Object.entries(inputData).map(([index, item]) => (
                                    <div className="mb-6" index={index}>
                                        {
                                            item.type === "select" ? (
                                                <div>
                                                    <label For={index} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index}</label>
                                                    <select id={index} name={index} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                        <option hidden selected disabled>{index}</option>
                                                        {
                                                            item.options.map((opt, idx) => (
                                                                <option index={idx} value={opt}>{opt}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            ) : (
                                                <div>
                                                    <label For={index} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index}</label>
                                                    <input type={item.type} name={index} id={index} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update data</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link } from "react-router-dom";

export default function Table({ dataTh, dataTd, coloumDB, buttonData, endpoints, columDetail, judulModalEdit, inputData }) {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [endpointReplaced, setEndPointReplaced] = useState({});
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

    function handleModalDelete(id) {
        const endpointsDetail = endpoints['detail'];
        const endpointsDelete = endpoints['delete'];

        const detailReplaced = endpointsDetail.replace('{id}', id);
        const deleteReplaced = endpointsDelete.replace('{id}', id);

        const replaced = {
            detail: detailReplaced,
            delete: deleteReplaced
        };
        setEndPointReplaced(replaced);
        setIsOpenModalDelete(true);
    }

    function handleModalEdit(id) {
        const endpointsDetail = endpoints['detail'];
        const endpointsUpdate = endpoints['update'];

        const detailReplaced = endpointsDetail.replace('{id}', id);
        const updateReplaced = endpointsUpdate.replace('{id}', id);

        const replaced = {
            detail: detailReplaced,
            update: updateReplaced
        };
        setEndPointReplaced(replaced);
        setIsOpenModalEdit(true);
    }

    function handleModalAdd() {
        const replaced = {
            store: endpoints['store']
        };
        setEndPointReplaced(replaced);
        setIsOpenModalAdd(true);
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
                <div className="flex justify-end mb-5">
                    {buttonData.includes("create") && (
                        <button onClick={handleModalAdd} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Create
                        </button>
                    )}
                    {buttonData.includes("trash") && (
                        <Link to={'/stuffs/trash'} className="ml-3 text-white bg-yellow-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Trash
                        </Link>
                    )}
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {dataTh.map((data, index) => (
                                <th scope="col" className="px-6 py-3" key={index}>{data}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(dataTd).map(([index, value]) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-right">{parseInt(index) + 1}.</td>
                                {Object.entries(coloumDB).map(([i, v]) => (
                                    <td key={i} className="px-6 py-4">
                                        {!v ? value[i] : value[i.replace(/[!@#$%^&]/, '')]?.[v] ?? '0'}
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-right">
                                    {buttonData.includes("edit") && (
                                        <button onClick={() => handleModalEdit(value.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit
                                        </button>
                                    )}
                                    {buttonData.includes("delete") && (
                                        <button onClick={() => handleModalDelete(value.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">
                                            Delete
                                        </button>
                                    )}
                                    {buttonData.includes("restore") && (
                                        <button onClick={() => handleModalDelete(value.id)} className="font-medium text-green-600 dark:text-green-500 hover:underline ml-3">
                                            Restore
                                        </button>
                                    )}
                                    {buttonData.includes("permanent-delete") && (
                                        <button onClick={() => handleModalDelete(value.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">
                                            Permanent Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointReplaced} columDetail={columDetail} />
            <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced} />
            <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced} />
        </>
    );
}

import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ModalContainer from "./Shared/ModalContainer";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

export default function CategoryListItem({
  categories,
  category,
  setCategories,
  i
}) {
  const { id, name } = category;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Close update modal
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <tr className="border">
      <td className="p-1.5">{i+1}</td>
      <td className="p-1.5">{name}</td>
      <td className="p-1.5">{id}</td>
      <td className="flex items-center gap-4 p-1.5">
        <FaRegEdit
          onClick={() => setShowUpdateModal(true)}
          className="min-w-fit cursor-pointer text-lg text-primary/75 transition-all duration-200 ease-in-out hover:text-primary-hover"
        />
        <FaRegTrashAlt
          onClick={() => setShowDeleteModal(true)}
          className="min-w-fit cursor-pointer text-lg text-red-300 transition-all duration-200 ease-in-out hover:text-red-500"
        />
      </td>
      {/* Update Modal */}
      {showUpdateModal && (
        <ModalContainer>
          <UpdateModal
            closeModal={closeUpdateModal}
            categories={categories}
            categoryName={name}
            id={id}
            setCategories={setCategories}
          />
        </ModalContainer>
      )}
      {/* Delete Modal */}
      {showDeleteModal && (
        <ModalContainer>
          <DeleteModal
            closeModal={closeDeleteModal}
            categoryName={name}
            id={id}
            setCategories={setCategories}
            categories={categories}
          />
        </ModalContainer>
      )}
    </tr>
  );
}

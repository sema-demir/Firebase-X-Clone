import { RiPencilFill } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";

const Dropdown = ({ handleDelete }) => {
  return (
    <>
      <label className="popup">
        <input type="checkbox" />
        <div className="burger" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Aksiyonlar</legend>
          <ul>
            <li>
              <button>
                <RiPencilFill />
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <FaTrashCan />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </>
  );
};

export default Dropdown;

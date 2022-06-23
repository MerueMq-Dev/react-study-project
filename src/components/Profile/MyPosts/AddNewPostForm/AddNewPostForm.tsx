import {
  createField,
  GetStringKeys,
  Textarea,
} from "../../../common/FormControls/FormsControls";
import {
  maxLengthCreator,
  required,
} from "../../../../utils/validators/validators";
import { InjectedFormProps,reduxForm } from "redux-form";




type PropsType = {};
const maxLength20 = maxLengthCreator(20);

export type NewPostFormValuesType = {
    newPostBody:string
  };
  
type NewPostFormValuesTypeKeys = GetStringKeys<NewPostFormValuesType>;

const AddNewPostForm: React.FC<
  InjectedFormProps<NewPostFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<NewPostFormValuesTypeKeys>(
          "Entre your post",
          "newPostBody",
          [required, maxLength20],
          Textarea
        )}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

export default reduxForm<NewPostFormValuesType>({ form: "addNewPostForm" })(
    AddNewPostForm
  );
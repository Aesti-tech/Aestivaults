import styles from "../../../modules/Collection.module.css";
import Modal, { useModal } from "../../../ui/Modal";
import Select from "react-select";
import { artTags } from "../../../services/Constants";
import { Controller, useForm } from "react-hook-form";

import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import { useCollection } from "./useCollection";

function CreateCollection() {
  const { close } = useModal();
  const { initializeCollection, isPending } = useCollection();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
  } = useForm();

  function onSubmit(data) {
    initializeCollection(data, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  }

  return (
    <Modal.Window name={"collection"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.createCollection}
      >
        <h2>Create a new collection</h2>

        <div className={styles.formRow}>
          <label htmlFor="collectionName">Name of Collection</label>
          <Input
            id="collectionName"
            name="name"
            disabled={isPending}
            placeholder="Name of Collection"
            register={register}
            validation={{
              required: "Name is required",
            }}
          />
          {errors?.name && (
            <p className={styles.error}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="collectionDescription">Description</label>
          <Input
            id="collectionDescription"
            name="description"
            disabled={isPending}
            placeholder="What is this collection about?"
            register={register}
            validation={{
              required: "Description is required",
            }}
          />
          {errors?.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="collectionTags">Tags</label>
          <Controller
            name="tags"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                id="collectionTags"
                options={artTags}
                {...field}
                isMulti
                className={styles.select}
                classNamePrefix="custom-select"
                placeholder="Select tags for your collection..."
              />
            )}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="featuredImage">Featured Image</label>
          <Input
            id="featuredImage"
            name="image"
            type="file"
            accept="image/*"
            disabled={isPending}
            placeholder="Upload a featured image"
            register={register}
          />
        </div>

        <div className={`${styles.formRow} ${styles.buttonRow}`}>
          <Button variations={"primary"} sizes={"medium"}>
            {isPending ? "Creating collection..." : "Create"}
          </Button>
          <Button
            type="reset"
            variations={"secondary"}
            sizes={"small"}
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal.Window>
  );
}

export default CreateCollection;

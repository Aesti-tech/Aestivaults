import { Controller, useForm } from "react-hook-form";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Select from "react-select";
import { useState } from "react";
import Card from "./Card";
import { Plus } from "lucide-react";
import styles from "../../../modules/Collection.module.css";
import toast from "react-hot-toast";
import { useMint } from "./useMint";
import { useParams } from "react-router-dom";
import { supabase } from "../../../services/API/supabase";
import { useUser } from "../../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import Modal, { useModal } from "../../../ui/Modal";
import { useDarkMode } from "../../../hooks/DarkModeContext";

function MintArtwork() {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState([]);
  const { mintArt, isPending } = useMint();
  const { id } = useParams();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const { isDarkMode } = useDarkMode();

  const { user } = useUser();

  const { close } = useModal();

  const { data: Eth, isLoading } = useQuery({
    queryKey: ["ethPrice"],
    queryFn: currentPrice,
  });

  if (isLoading) return null;

  async function currentPrice() {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();

    return data?.USD;
  }

  async function onSubmit(data) {
    let { data: USD_BALANCE, error: usdError } = await supabase
      .from("USD_BALANCE")
      .select("*")
      .eq("user_id", user.id);

    if (usdError) console.error("Error fetching data:", usdError);

    if (USD_BALANCE.length === 0) {
      toast.error("You do not have Enough balance for the mint");
      return;
    }

    const [{ balance }] = USD_BALANCE;
    const mintFee = 0.15 * Eth;

    if (balance < mintFee) {
      toast.error("You do not have Enough balance for the mint");
      return;
    }

    const newBalance = Number(balance) - Number(mintFee);
    const bal = String(newBalance);
    const { error: updateUsdError } = await supabase
      .from("USD_BALANCE")
      .update({ balance: bal })
      .eq("user_id", user.id);
    if (updateUsdError) console.error("Error fetching data:", updateUsdError);
    const hello = { ...data, image, collectionId: id };
    if (image.length === 0) {
      toast.error("please upload an image to proceed");
      return;
    }
    mintArt(hello, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader();
      setImage(file);

      reader.onload = (e) => {
        setPreview(e.target.result); // Update preview with file data URL
      };

      reader.readAsDataURL(file); // Read the file
    } else {
      setPreview(null); // Reset preview if no file
    }
  };

  return (
    <Modal.Window name={"Mint"}>
      <form className={styles.mintForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.formTitle}>Mint Image</h2>

        <div className={styles.formRow}>
          <label htmlFor="NFT name">Name of NFT</label>
          <Input
            disabled={isPending}
            placeholder="Name of NFT"
            register={register}
            name="name"
            validation={{ required: "name is required" }}
          />
          {errors?.name && (
            <p className={styles.error}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="NFT description">Description</label>
          <Input
            disabled={isPending}
            placeholder="What is this NFT about?"
            register={register}
            name="description"
            validation={{ required: "description is required" }}
          />
          {errors?.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="royalty fees">Royalty fees</label>
          <Controller
            name="royalty"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                options={royalty}
                {...field}
                className={styles.selectField}
                classNamePrefix="custom-select"
                placeholder="What is your royalty %?"
              />
            )}
          />

          {errors?.royalty && (
            <p className={styles.error}>{errors.royalty.message}</p>
          )}
        </div>

        <div className={styles.fileSection}>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            className={styles.fileInput}
            onChange={handleFileChange}
          />
          {preview && (
            <div className={styles.filePreview}>
              <img src={preview} alt="File Preview" />
            </div>
          )}

          <label htmlFor="file-input">
            <Card
              className={`${styles.uploadCard} ${isDarkMode ? "darkMode" : ""}`}
            >
              <div className={styles.imageWrapper}>
                <div className={styles.plusIconWrapper}>
                  <Plus size={32} className={styles.plusIcon} />
                </div>
                <h3 className={styles.uploadTitle}>Upload Image</h3>
              </div>
            </Card>
          </label>

          <div className={styles.buttonGroup}>
            <Button variations="primary" sizes="medium">
              {isPending ? "Minting...." : "Mint"}
            </Button>
            <Button
              type="reset"
              onClick={close}
              variations="secondary"
              sizes="small"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Modal.Window>
  );
}

export default MintArtwork;

const royalty = [
  { value: "5%", label: "5%" },
  { value: "10%", label: "10%" },
  { value: "15%", label: "15%" },
  { value: "20%", label: "20%" },
];

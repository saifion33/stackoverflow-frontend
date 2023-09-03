import { ChangeEvent, forwardRef, useImperativeHandle, useState,useRef } from "react"
import { showAlertWithTimeout } from "../../redux/slice/alertSlice"
import { AiFillCamera, AiFillCloseCircle } from "react-icons/ai"
import { useAppDispatch } from "../../redux-hooks"
import { getImageBlob } from "../../utils/helpers"
import AvatarEditor from 'react-avatar-editor'



interface Iprops {
    imageUrl: string,
    userId: string,
}

export interface RefType {
    uploadImage: () => Promise<Blob|null>
}
const MAX_FILE_SIZE = 1024 * 1024 * 2  //Max file size 2MB
const UpdateProfileImage = forwardRef(({ imageUrl}: Iprops, ref) => {

    const editorRef=useRef(null);
    const [selectedProfileImage, setSelectedProfileImage] = useState<File | string | null>(imageUrl)
    const [imageToRender, setImageToRender] = useState<null | string>(null)
    const dispatch = useAppDispatch()

    const uploadImage = async () => {
        if (selectedProfileImage!==imageUrl) {
            try {
                const image=await getImageBlob(editorRef)
                return image
            } catch (error) {
                console.log(error)
               dispatch(showAlertWithTimeout({message:'Image not processed.',type:'error'}))
            }
            return null
        }
        else{
            return null
        }
    }
    useImperativeHandle(ref, () => ({
        uploadImage
    }))

    const handleSelectProfileImage = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0] || null
        setSelectedProfileImage(selectedImage)
        if (selectedImage && selectedImage.size > MAX_FILE_SIZE) {
            setSelectedProfileImage(null)
            console.log('Please select a file less than 2MB.')
            return
        }
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                if (img.width < 128 || img.height < 128) {
                    alert('please select image that have minimum width and height 128px');
                }
            };
            const result = reader.result
            if (typeof result === 'string') {
                img.src = result;
                setImageToRender(result);
            }
        };
        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
        }
    }
    const handleResetProfileImage = () => {
        setImageToRender(null)
        setSelectedProfileImage(imageUrl);
    }

    return (
        <div className="image-container max-w-[132px] h-[132px] relative bg-gray-100 rounded  border-2 border-customOrange ">
            {
                ( selectedProfileImage) && <AvatarEditor ref={editorRef} image={selectedProfileImage} width={128} border={0} height={128} />
            }
            
            <label htmlFor="profile-image"><AiFillCamera className="absolute cursor-pointer z-30 text-3xl  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-green-400 rounded-full p-1" /></label>
            <input onChange={handleSelectProfileImage} className="hidden" type="file" name="profile-image" id="profile-image" />
            {imageToRender && <AiFillCloseCircle onClick={handleResetProfileImage} role="button" className="text-3xl absolute top-0 left-0 text-white bg-red-600 rounded-full p-[2px]" />}
        </div>
    )
})
export default UpdateProfileImage
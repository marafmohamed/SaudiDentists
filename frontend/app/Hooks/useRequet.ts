import { useApp } from "../Context"
import { FormData } from "@/app/Components/RegistrationForm"
import useUploadFile from "./useUpload"
export default function useRequet() {
    const { baseUrl } = useApp()
    const { uploadFile } = useUploadFile()
    const verifyURLs = (formData: FormData) => {
        // Regex for validating URLs
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

        // Iterate through formData keys to check for URLs
        const invalidUrls = Object.keys(formData).filter((key) => {
            const value = formData[key]; // Get the value of the field
            // Skip empty values, but validate non-empty values containing "url"
            return key.toLowerCase().includes("url") && typeof value === "string" && value !== "" && !urlRegex.test(value);
        });

        // Return invalid URLs or true if all are valid
        if (invalidUrls.length > 0) {
            // Alert the user about the invalid URLs
            alert("The following URLs are invalid: " + invalidUrls.join(", "));
            return false; // or return invalidUrls for further handling
        }

        return true; // All URLs are valid
    };


    const CreateRequest = async (formData: FormData) => {
        if (formData.profilePicture instanceof File) {
            // upload the profile picture and store the url in the form data
            const uploadedFile = await uploadFile(formData.profilePicture, "image");
            if (typeof uploadedFile === "string") {
                formData.profilePicture = uploadedFile;
            } else {
                throw new Error("Uploaded file is not of type 'string'");
            }
        }
        if (formData.curriculumVitaeUrl instanceof File) {
            // upload the CV and store the url in the form data
            const uploadedFile = await uploadFile(formData.curriculumVitaeUrl, "pdf");
            if (typeof uploadedFile === "string") {
                formData.curriculumVitaeUrl = uploadedFile;
            } else {
                throw new Error("Uploaded file is not of type 'string'");
            }
        }
        if (verifyURLs(formData)) {
            const data = await fetch(`${baseUrl}/api/requests/createDentistRequest`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            const json = await data.json();
            if (!data.ok) {
                console.log(json)
            }
            return json;
        }
    }
    const getRequests = async (page: number, limit: number) => {
        const PageQuery = `?page=${page}&limit=${limit}`
        const data = await fetch(`${baseUrl}/api/requests${PageQuery}`);
        const json = await data.json();
        if (!data.ok) {
            console.log(json)
        }
        return json;
    }
    const getRequest = async (id: string) => {
        const data = await fetch(`${baseUrl}/api/requests/${id}`);
        const json = await data.json();
        if (!data.ok) {
            console.log(json)
        }
        return json;
    }
    const ApproveRequest = async (id: string) => {
        const data = await fetch(`${baseUrl}/api/requests/${id}/approve`, {
            method: 'POST',
        });
        const json = await data.json();
        if (!data.ok) {
            console.log(json)
        }
        return json;
    }
    const RejectRequest = async (id: string) => {
        const data = await fetch(`${baseUrl}/api/requests/${id}/reject`, {
            method: 'POST',
        });
        const json = await data.json();
        if (!data.ok) {
            console.log(json)
        }
        return json;
    }
    return {
        CreateRequest,
        getRequests,
        getRequest,
        ApproveRequest,
        RejectRequest,
    }
}

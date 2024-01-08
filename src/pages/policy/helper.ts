import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import PolicyService from 'services/policy-service';
import { useAppSelector } from 'store/hooks';

interface AddPolicyProps {
  policyData: any;
  updateModal: boolean;
  getPolicies: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPolicyData: Dispatch<SetStateAction<any>>;
  setUpdateModal: Dispatch<SetStateAction<boolean>>;
  setCurrentPolicyId: Dispatch<SetStateAction<string>>;
}

interface ViewPolicyProps {
  open: boolean;
  policyData: any;
  setCurrentPolicyId: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setUpdateModal: Dispatch<SetStateAction<boolean>>;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useAddPolicy = ({
  setOpen,
  policyData,
  getPolicies,
  updateModal,
  setPolicyData,
  setUpdateModal,
  setCurrentPolicyId,
}: AddPolicyProps) => {
  const { id, title, description, filePath } = policyData;
  const newFilePath =
    (process.env.REACT_APP_API_IS_DEV === 'true'
      ? 'http://localhost:8080/'
      : 'https://erp-staging.sprintx.net/') + filePath;
  const fileRef = useRef<any>();
  const [files, setFiles] = useState<any>([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('title', data.title);
    formData.append('description', data.description);

    const res = id
      ? await PolicyService.updatePolicy(id, formData, setUploadPercentage)
      : await PolicyService.addPolicy(formData, setUploadPercentage);
    if ([200, 201].includes(res.status)) {
      reset({});
      setOpen(false);
      await getPolicies();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPolicyData({});
    setUpdateModal(false);
    setCurrentPolicyId('');
  };

  function loadURLToInputFiled(url: string): any {
    getImgURL(url, (imgBlob: any) => {
      let file = new File([imgBlob], title + '.pdf', {
        type: 'application/pdf',
        lastModified: new Date().getTime(),
      });
      let container = new DataTransfer();
      container.items.add(file);
      fileRef.current.files = container.files;
      setFiles(container.files);
    });
  }

  function getImgURL(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      callback(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  useEffect(() => {
    if (updateModal) {
      loadURLToInputFiled(newFilePath);
      reset({
        title,
        description,
      });
      console.log(fileRef);
    }
  }, []);

  return {
    id,
    title,
    description,
    filePath,
    fileRef,
    files,
    errors,
    uploadPercentage,
    setFiles,
    handleSubmit,
    onSubmit,
    register,
    handleClose,
  };
};

export const useViewPolicy = ({
  setOpen,
  setIsOpen,
  policyData,
  setUpdateModal,
  setDeleteModalOpen,
  setCurrentPolicyId,
}: ViewPolicyProps) => {
  const { id, title, description, filePath } = policyData;
  const newFilePath =
    (process.env.REACT_APP_API_IS_DEV === 'true'
      ? process.env.REACT_APP_BASE_URL_DEV
      : process.env.REACT_APP_BASE_URL_PRODUCTION) + filePath;

  const { currentUser } = useAppSelector((state) => state.app);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [isLoadingRejected, setIsLoadingRejected] = useState<boolean>(false);

  const handleClick = () => {
    window.location.assign(newFilePath);
  };

  const handleEdit = () => {
    setOpen(false);
    setOpenEdit(true);
    setIsOpen(true);
    setCurrentPolicyId(id);
    setUpdateModal(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
    setCurrentPolicyId(id);
  };

  const download = () => {
    fetch(newFilePath).then((t) => {
      return t.blob().then((b) => {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.setAttribute('download', title + '.pdf');
        a.click();
      });
    });
  };

  return {
    title,
    description,
    filePath,
    currentUser,
    openEdit,
    download,
    handleEdit,
    handleClick,
    handleDelete,
    isLoadingRejected,
    setIsLoadingRejected,
  };
};

export const usePolicy = () => {
  const { currentUser } = useAppSelector((state) => state.app);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [policies, setPolicies] = useState<any>([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [policyData, setPolicyData] = useState<any>({});
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPolicyId, setCurrentPolicyId] = useState<string>('');
  const [openViewPolicy, setOpenViewPolicy] = useState<boolean>(false);

  const getPolicies = async () => {
    setLoading(true);
    const res = await PolicyService.getAllPolicies();
    if (res.status === 200) {
      setPolicies(res.data.data);
    }
    setLoading(false);
  };

  const deletePolicy = async () => {
    setDeleteLoader(true);
    const res = await PolicyService.deletePolicy(currentPolicyId);
    if ([200, 201].includes(res.status)) {
      setOpenViewPolicy(false);
      setDeleteModalOpen(false);
      setDeleteLoader(false);
      await getPolicies();
    }
  };

  const handleClick = (data: any) => {
    const { _id, title, description, filePath } = data;
    setOpenViewPolicy(true);
    setPolicyData({
      id: _id,
      title,
      description,
      filePath: filePath.split('./')[1],
    });
  };

  useEffect(() => {
    getPolicies();
  }, []);

  return {
    open,
    loading,
    policies,
    policyData,
    updateModal,
    currentUser,
    deleteLoader,
    openViewPolicy,
    deleteModalOpen,
    setOpen,
    getPolicies,
    handleClick,
    deletePolicy,
    setPolicyData,
    setUpdateModal,
    setDeleteLoader,
    setOpenViewPolicy,
    setCurrentPolicyId,
    setDeleteModalOpen,
  };
};

const schema = yup.object().shape({
  title: yup.string().required('policy is required field'),
  description: yup.string().required('description is required field'),
});

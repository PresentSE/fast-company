import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import Loader from "../../common/loader";
import BackHistoryButton from "../../common/backButton";

import { useDispatch, useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import { getProfessions } from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const EditUserPage = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const qualities = useSelector(getQualities());
    const qualitiesList = transformData(qualities);
    const professions = useSelector(getProfessions());
    const professionsList = transformData(professions);
    const professionsLoading = useSelector(getQualitiesLoadingStatus());
    const [errors, setErrors] = useState({});

    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

    const changeQualities = (elements) => {
        const qualitiesArray = [];

        for (const elem of elements) {
            for (const quality of qualities) {
                if (elem === quality._id) {
                    qualitiesArray.push(quality);
                }
            }
        }
        return qualitiesArray;
    };

    function transformData(data) {
        return data.map((d) => ({ label: d.name, value: d._id }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;
        const updatedUser = {
            ...data,
            qualities: qualities.map((q) => q.value)
        };
        console.log(updatedUser);
        const redirect = `/users/${currentUser._id}`;
        dispatch(updateUser({ payload: updatedUser, redirect }));
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(changeQualities(currentUser.qualities))
            });
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(data);
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;

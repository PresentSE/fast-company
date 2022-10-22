import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import Loader from "../../common/loader";
import BackHistoryButton from "../../common/backButton";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { currentUser, editUser } = useAuth();
    const { qualities, isLoading: qualitiesLoading } = useQualities();
    const qualitiesList = transformData(qualities);
    const { professions, isLoading: professionsLoading } = useProfessions();
    const professionsList = transformData(professions);
    const history = useHistory();
    const { userId } = useParams();
    const [errors, setErrors] = useState({});

    const checkCurrentUser = () => {
        if (currentUser._id !== userId) {
            history.push("/users/" + currentUser._id + "/edit/");
        }
    };
    useEffect(() => {
        checkCurrentUser();
    }, []);

    const getQualities = (elements) => {
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

    const [data, setData] = useState({
        ...currentUser,
        qualities: transformData(getQualities(currentUser.qualities))
    });

    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label };
    //         }
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;
        const updatedUser = {
            ...data,
            qualities: qualities.map((q) => q.value)
        };
        console.log(updatedUser);
        try {
            await editUser(updatedUser);
            history.push(`/users/${currentUser._id}`);
        } catch (error) {
            setErrors(error);
        }
    };

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
                    {!data || !qualitiesLoading || !professionsLoading ? (
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

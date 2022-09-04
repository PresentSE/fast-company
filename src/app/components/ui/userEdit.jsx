import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelect";
import Loader from "../common/loader";

const UserEdit = ({ userId }) => {
    const [data, setData] = useState([]);
    const [userToEdit, setUserToEdit] = useState({});
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState({});
    const [qualities, setQualities] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setData(data);
            console.log(data);
        });
        api.users.getById(userId).then((data) => {
            setUserToEdit({
                name: data.name,
                email: data.email,
                profession: data.profession.name,
                sex: data.sex,
                qualities: data.qualities.map((quaitie) => ({
                    label: quaitie.name,
                    value: quaitie._id
                }))
            });
        });
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    console.log(userToEdit);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
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
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigits: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: { message: "Обязательно выберите вашу профессию" }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    if (userToEdit.qualities && Object.keys(professions).length !== 0) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={userToEdit.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                type="email"
                                name="email"
                                value={userToEdit.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                onChange={handleChange}
                                options={professions}
                                defaultOption={userToEdit.professions}
                                name="professions"
                                value={userToEdit.professions}
                                error={errors.profession}
                                label="Выбери свою профессию"
                            />

                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={userToEdit.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />

                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={userToEdit.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />

                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
};

UserEdit.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserEdit;

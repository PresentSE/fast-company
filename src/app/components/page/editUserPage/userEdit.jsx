import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelect";
import Loader from "../../common/loader";
import { useHistory } from "react-router-dom";

const UserEdit = ({ userId }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });

    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState({});
    const [qualities, setQualities] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData({
                name: data.name,
                email: data.email,
                profession: data.profession,
                sex: data.sex,
                qualities: data.qualities
            });
        });

        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

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
        name: {
            isRequired: {
                message: "Обязательно введите имя"
            }
        }
    };

    const transformData = (data) => {
        let userForLocalStore = JSON.parse(JSON.stringify(data));
        if (userForLocalStore.qualities[0].label) {
            const qualArray = [];
            Object.keys(qualities).forEach((key) => {
                userForLocalStore.qualities.forEach((item) => {
                    if (qualities[key]._id === item.value) {
                        qualArray.push({
                            _id: item.value,
                            name: item.label,
                            color: qualities[key].color
                        });
                    }
                });
            });
            userForLocalStore = {
                ...userForLocalStore,
                qualities: qualArray
            };
        } else {
            console.log("качества в порядке");
        }

        if (!userForLocalStore.profession.name) {
            Object.keys(professions).forEach((key) => {
                if (professions[key]._id === userForLocalStore.profession) {
                    userForLocalStore = {
                        ...userForLocalStore,
                        profession: professions[key]
                    };
                }
            });
        } else {
            console.log("профессии в порядке");
        }
        return userForLocalStore;
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
        api.users
            .update(userId, transformData(data))
            .then(() => history.push(`/users/${userId}`));
    };

    if (data.qualities && Object.keys(professions).length !== 0) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-3 shadow p-4">
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
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                onChange={handleChange}
                                options={professions}
                                defaultOption={data.profession.name}
                                name="profession"
                                value={data.profession._id}
                                label="Выбери свою профессию"
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
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities.map(
                                    (qualitie) => ({
                                        label: qualitie.name,
                                        value: qualitie._id
                                    })
                                )}
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

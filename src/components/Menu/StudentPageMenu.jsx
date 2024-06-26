import {Avatar, Menu} from "antd";
import {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";


function StudentPageMenu() {
    const [selectedKey, setSelectedKey] = useState('');
    const location = useLocation()
    const items = [
        {
            label: 'Дневник',
            children: [
                {
                    label: <Link to='diary'>Дневник</Link>,
                    key: 'diary',
                },
                {
                    label: <Link to='homeworks'>Домашнее задание</Link>,
                    key: 'homeworks',
                },
            ]
        },
        {
            label: 'Оценки',
            children: [
                {
                    label: <Link to='all_marks'>Все оценки</Link>,
                    key: 'all_marks',
                },
                {
                    label: 'Итоговые оценки',
                    key: 'final_marks',
                }
            ]
        },
        {
            label: 'Образование',
            children: [
                {
                    label: 'Рабочие программы',
                    key: 'workPrograms'
                },
                {
                    label: 'Учебный план',
                    key: 'curriculum'
                },
                {
                    label: 'Календарь',
                    key: 'calendar'
                }
            ]
        },
        {
            label: 'Полезное',
            key: 'useful',
            children: [
                {
                    label: 'Олимпиады',
                    key: 'olympiads'
                }
            ]
        },
        {
            key: 'avatar',
            label: (
                <Avatar size={30} icon={<UserOutlined />} />
            ),
            children: [
                {
                    key: 'studentProfile',
                    label: 'Профиль'
                },
                {
                    key: 'logOut',
                    label: 'Выйти'
                }
            ]
        },
    ]

    useEffect(() => {
        const thisLocation = location.pathname.split('/')
        setSelectedKey(thisLocation[thisLocation.length - 1])
    }, []);


    return (
        <div>
            <Menu
                style={{alignItems: 'center', justifyContent: 'center'}}
                mode="horizontal"
                items={items}
                selectedKeys={[selectedKey]}
                onClick={(item) => setSelectedKey(item.key)}
            />
        </div>
    )
}

export default StudentPageMenu;
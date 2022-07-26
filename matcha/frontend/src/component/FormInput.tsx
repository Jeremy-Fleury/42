/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   FormInput.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:50 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/30 17:26:50 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';

const styleInput: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
    border: "none",
    outline: "none",
    fontSize: "1.2rem",
}

interface Props {
    placeholder: string;
    type?: "password";
}

export const FormInput = (props:Props) => {
    return (
        <input style={styleInput} placeholder={props.placeholder} type={props.type}></input>
    );
}
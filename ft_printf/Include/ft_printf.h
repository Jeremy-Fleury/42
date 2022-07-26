/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_printf.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/11 14:21:30 by jfleury           #+#    #+#             */
/*   Updated: 2019/01/25 14:17:43 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FT_PRINTF_H
# define FT_PRINTF_H

# include <stdlib.h>
# include <unistd.h>
# include <stdarg.h>
# include <string.h>

# define CONV_ID_NB 13
# define FLAGS_NB 5
# define PRECI_GROUPS 3
# define RED   "\x1B[31m"
# define GRN   "\x1B[32m"
# define YEL   "\x1B[33m"
# define BLU   "\x1B[34m"
# define MAG   "\x1B[35m"
# define CYN   "\x1B[36m"
# define WHT   "\x1B[37m"
# define RESET "\x1B[0m"

typedef struct		s_conv_spec
{
	char			conv_id;
	int				*flags;
	int				*modifier;
	int				field_width;
	int				precision;
	char			*converted;
}					t_conv_spec;

typedef struct		s_fptr_id
{
	char			*conv_id_tab;
	char			*(*fptr[CONV_ID_NB])(t_conv_spec c_s, va_list *list);
}					t_fptr_id;

typedef struct		s_fptr_flag
{
	int				*flags;
	char			*(*fptr[FLAGS_NB])(t_conv_spec c_s, char *str);
}					t_fptr_flag;

typedef struct		s_fptr_preci
{
	char			**preci_group;
	char			*(*fptr[PRECI_GROUPS])(t_conv_spec c_s, char *str);
}					t_fptr_preci;

int					ft_printf(char *format, ...);

char				*ft_data_conv_id(void);
int					ft_store_conv_id(t_conv_spec *c_s, char *format, int i);
void				ft_store_modifier(t_conv_spec *c_s, char *f, int i, int l);
void				ft_store_flag(t_conv_spec *c_s, char *format, int i, int l);
void				ft_store_wc_field_width(t_conv_spec *c_s, va_list *ap);
void				ft_store_wc_precision(t_conv_spec *c_s, va_list *ap);
void				ft_store_field_width
					(t_conv_spec *c_s, char *format, int i, int len);
void				ft_store_precision(t_conv_spec *c_s, char *f, int i, int l);
void				ft_struct_init(t_conv_spec *c_s);
void				ft_struct_del(t_conv_spec *c_s);
char				*ft_data_conv_ids(void);
char				*ft_process_c(t_conv_spec c_s, va_list *ap);
char				*ft_process_s(t_conv_spec c_s, va_list *ap);
char				*ft_process_p(t_conv_spec c_s, va_list *ap);
char				*ft_process_di(t_conv_spec c_s, va_list *ap);
char				*ft_process_o(t_conv_spec c_s, va_list *ap);
char				*ft_process_u(t_conv_spec c_s, va_list *ap);
char				*ft_process_x(t_conv_spec c_s, va_list *ap);
char				*ft_process_xx(t_conv_spec c_s, va_list *ap);
char				*ft_process_f(t_conv_spec c_s, va_list *ap);
char				*ft_process_b(t_conv_spec c_s, va_list *ap);
char				*ft_process_dd(t_conv_spec c_s, va_list *ap);
char				*ft_process_percent(t_conv_spec c_s, va_list *ap);
char				*ft_process_id(t_conv_spec c_s, va_list *ap);
char				*ft_process_flags(t_conv_spec c_s, char *str);
char				*ft_process_hash(t_conv_spec c_s, char *str);
char				*ft_hash_xx_preci(char *str, int i);
char				*ft_hash_xx_zero(char *str, int i);
char				*ft_hash_x_preci(char *str, int i);
char				*ft_hash_x_zero(char *str, int i);
char				*ft_process_plus(t_conv_spec c_s, char *str);
char				*ft_process_zero(t_conv_spec c_s, char *str);
char				*ft_process_minus(t_conv_spec c_s, char *str);
char				*ft_process_space(t_conv_spec c_s, char *str);
char				*ft_process_min_width(t_conv_spec c_s, char *str);

char				*ft_precision_diouxx(t_conv_spec c_s, char *str);
char				*ft_precision_s(t_conv_spec c_s, char *str);
char				*ft_precision_p(t_conv_spec c_s, char *str);
char				*ft_process_preci(t_conv_spec c_s, char *str);
void				ft_bzero(void *s, size_t n);
int					ft_isdigit(int c);
char				*ft_itoa(long long n);
char				*ft_itoa_base(unsigned long long n, int base);
char				*ft_itoa_double(t_conv_spec conv_spec, long double nb);
void				*ft_memalloc(size_t size);
void				*ft_memmove(void *dest, const void *src, size_t n);
void				*ft_memset(void *s, int c, size_t n);
void				*ft_memcpy(void *dest, const void *src, size_t n);
void				ft_putstr(char const *s);
char				*ft_strcat(char *dest, const char *src);
char				*ft_strcpy(char *dest, const char *src);
char				*ft_strdup(const char *src);
char				*ft_strndup(const char *src, size_t n);
char				*ft_strextend(char *s1, char const *s2);
size_t				ft_strlen(const char *str);
char				*ft_strncat(char *dest, const char *src, size_t n);
char				*ft_strnchr(const char *s, int c, int n);
char				*ft_strrnchr(const char *s, int c, int n);
char				*ft_strchr(const char *s, int c);
char				*ft_strnew(size_t size);
char				*ft_strnextend(char *s1, char const *s2, size_t len);
char				*ft_strsub(char const *s, unsigned int start, size_t len);
char				*ft_strupcase(char *str);
char				*ft_strrev(char *str);
void				ft_putchar(char c);
char				*ft_strncpy(char *dest, const char *src, size_t n);
char				*ft_char_replace(char *str, char c, char r);
int					ft_strequ(char const *s1, char const *s2);
int					ft_strcmp(char const *s1, char const *s2);
unsigned long long	ft_power(unsigned long long nb, unsigned long long power);

#endif

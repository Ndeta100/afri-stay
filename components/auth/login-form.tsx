"use client"
import {useForm} from "react-hook-form";
import {useTransition} from "react";
import * as z from "zod"
import {LoginSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl,Form,FormField,FormItem,FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CardWrapper from "@/components/auth/card-wrapper";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {login} from "@/actions/login";
export const LoginForm = () => {
    const [isPending, startTransition]=useTransition()
    const form=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })

    const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
        startTransition(()=>{
            login(values)
        })
    }
            return (
            <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel={"Don't have an account?"}
            backButtonHref="/auth/register"
            showSocial
            >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className={'space-y-6'}
                >
                    <div className={'space-y-4'}>
                        <FormField name={'email'}
                                   control={form.control}
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                       placeholder={'john.doe@example.com'}
                                                         type={'email'}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                        />
                        <FormField name={'password'}
                                   control={form.control}
                                   render={({field})=>(
                                       <FormItem>
                                           <FormLabel>Password</FormLabel>
                                           <FormControl>
                                               <Input {...field}
                                                      placeholder={'******'}
                                                      type={'password'}
                                               />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                        />
                    </div>
                    <FormError message={"something went wrong"}/>
                    <FormSuccess message={'email sent'}/>
                    <Button type={'submit'}
                    className={'w-full'}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

package com.itmo.weblab4.processors;

import com.itmo.weblab4.annotations.ExecutionTimeMeasured;
import com.itmo.weblab4.handlers.ExecutionTimeHandler;
import com.itmo.weblab4.repos.ExecutionTimeRepository;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;

@Component
public class ExecutionTimeBeanPostProcessor implements BeanPostProcessor {
    private final ExecutionTimeRepository executionTimeRepository;

    public ExecutionTimeBeanPostProcessor(ExecutionTimeRepository executionTimeRepository) {
        this.executionTimeRepository = executionTimeRepository;
    }


    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        Class<?> beanClass = bean.getClass();
        Method[] methods = beanClass.getDeclaredMethods();

        if (Arrays.stream(methods).anyMatch(m -> m.isAnnotationPresent(ExecutionTimeMeasured.class))) {
            return Proxy.newProxyInstance(
                    beanClass.getClassLoader(),
                    beanClass.getInterfaces(),
                    new ExecutionTimeHandler(bean, executionTimeRepository)
            );
        }
        return bean;
    }
}
